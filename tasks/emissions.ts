import { PoolClient } from 'pg';

import { pgPool } from '../pgpool';

import {
  getLocationData,
  getEmissionsData,
  getEmissionEvaluationData,
} from '../functions/db';

import {
  signIn,
  signOut,
  importEmissions,
  exportEmissions,
} from '../functions/api';

import {
  dailyBackstopProps,
  dailyCalibrationProps,
  dailyEmissionProps,
  dailyFuelProps,
  dailyTestSummaryProps,
  derivedHourlyValueProps,
  emissionEvaluationProps,
  hourlyFuelFlowProps,
  hourlyGFMProps,
  hourlyOperatingProps,
  hourlyParameterFuelFlowProps,
  longTermFuelFlowProps,
  matsDerivedHourlyValueProps,
  matsMonitorHourlyValueProps,
  monitorHourlyValueProps,
  nsps4tCompliancePeriodProps,
  nsps4tFourthQuarterProps,
  nsps4tSummaryProps,
  samplingTrainProps,
  sorbentTrapProps,
  summaryValueProps,
  weeklySystemIntegrityProps,
  weeklyTestSummaryProps
} from '../constants/properties';

const compareExportedEmissions = async (
  tableName: string,
  jsonData: any[],
  props: any[],
  year: number,
  quarter: number,
  locations: string[],
  client: PoolClient,
): Promise<string[]> => {
  const errors: string[] = [];
  const dbData = await getEmissionsData('camdecmps', tableName, props, year, quarter, locations, client);

  console.log(`Comparing ${tableName} with counts of ${jsonData.length}|${dbData.length}...`);

  if (jsonData.length !== dbData.length)
    errors.push(`[${tableName}] counts: ${jsonData.length}|${dbData.length}`);

  dbData.forEach((r, i) => {
    const j = jsonData[i];
    //console.log('json: ', j);
    //console.log('db: ', r);

    if (
      ((j['stackPipeId'] && j['stackPipeId'] === r['stack_name']) || j['stackPipeId'] === null || j['stackPipeId'] === undefined) &&
      ((j['unitId'] && j['unitId'] === r['unit_name']) || j['unitId'] === null || j['unitId'] === undefined)
    ) {
      props.filter(p => p.json !== null).forEach(p => {
        if (
          (p.type === 'date' && j[p.json] !== new Date(r[p.db]).toISOString().slice(0,10)) ||
          (p.type === 'number' && j[p.json] && r[p.db] && j[p.json] !== Number(r[p.db])) ||
          (p.type === 'string' && j[p.json] !== r[p.db])
        ) {
          errors.push(`[${tableName}] location: ${j['stackPipeId'] ?? j['unitId']}, ${p.json}: ${j[p.json]}|${r[p.db]}`);
        }
      })
    } else {
      errors.push(`[${tableName}] location: ${j['stackPipeId'] ?? j['unitId']}|${r['stack_name'] ?? r['unit_name']}`);
    }
  });

  return errors;
}

const compareEmissionEvaluation = async (
  props: any[],
  monPlanId: string,
  year: number,
  quarter: number,
  client: PoolClient,
): Promise<string[]> => {
  const errors: string[] = [];
  const tableName = 'emission_evaluation';
  const offData = await getEmissionEvaluationData('camdecmps', monPlanId, year, quarter, client);
  const wksData = await getEmissionEvaluationData('camdecmpswks', monPlanId, year, quarter, client);

  console.log(`Comparing ${tableName} with counts of ${offData.length}|${wksData.length}...`);

  if (offData.length !== wksData.length)
    errors.push(`[${tableName}] counts: ${offData.length}|${wksData.length}`);

  wksData.forEach((w, i) => {
    const o = offData[i];
    //console.log('official: ', o);
    //console.log('workspace: ', w);
    props.forEach(p => {
      if (
        (!p.wksValue && p.type === 'date' && new Date(o[p.db]).toISOString().slice(0,10) != new Date(w[p.db]).toISOString().slice(0,10)) ||
        (!p.wksValue && p.type !== 'date' && o[p.db] != w[p.db]) ||
        (p.wksValue && w[p.db] !== p.wksValue)
      ) {
        errors.push(`[${tableName}] ${p.db}: ${o[p.db]}|${w[p.db]}`);
      }
    });
  });

  return errors;
}

const compareImportedEmissions = async (
  tableName: string,
  props: any[],
  year: number,
  quarter: number,
  locations: string[],
  client: PoolClient,
): Promise<string[]> => {
  const errors: string[] = [];
  const offData = await getEmissionsData('camdecmps', tableName, props, year, quarter, locations, client, true);
  const wksData = await getEmissionsData('camdecmpswks', tableName, props, year, quarter, locations, client, true);

  console.log(`Comparing ${tableName} with counts of ${offData.length}|${wksData.length}...`);

  if (offData.length !== wksData.length)
    errors.push(`[${tableName}] counts: ${offData.length}|${wksData.length}`);

  wksData.forEach((w, i) => {
    const o = offData[i];
    //console.log('official: ', o);
    //console.log('workspace: ', w);
    props.forEach(p => {
      if (
        (p.type === 'date' && new Date(o[p.db]).toISOString().slice(0,10) != new Date(w[p.db]).toISOString().slice(0,10)) ||
        (p.type !== 'date' && o[p.db] != w[p.db])
      ) {
        errors.push(`[${tableName}] location: ${o['stack_name'] ?? o['unit_name']}, ${p.db}: ${o[p.db]}|${w[p.db]}`);
      }
    });
  });

  return errors;
}

export async function emissionsExportImport(
  orisCode: number,
  config: string,
  year: number,
  quarter: number,
) {
  let user: any;
  let promises: any[] = [];
  let differences: string[] = [];
  const client = await pgPool.connect();

  // ensure that the list is properly ordered
  config = config
    .split(', ')
    .sort((a, b) => {
      if (a < b) return -1;
      else if (b < a) return 1;
      else return 0;
    }).join(', ');  

  const dbResults = await getLocationData(orisCode, config, year, quarter, client);
  const monPlanId = dbResults[0].mon_plan_id;
  const rptPeriodId = dbResults[0].rpt_period_id;
  const facilityName = dbResults[0].facility_name;
  const locations = dbResults.map(r => r.mon_loc_id);

  console.log(`Validating ${year} Q${quarter} (${rptPeriodId}) emissions data for facility: ${facilityName}, orisCode: ${orisCode}, config: ${config}`);
  console.log('monPlanId: ', monPlanId);

  console.log(`Exporting emissions data...`);
  let response = await exportEmissions(monPlanId, year, quarter);
  const jsonData = response.data;

  if (jsonData.orisCode !== orisCode)
    differences.push(`orisCode: ${jsonData.orisCode}|${orisCode}`);
  if (jsonData.year !== year)
    differences.push(`year: ${jsonData.year}|${year}`);
  if (jsonData.quarter !== quarter)
    differences.push(`quarter: ${jsonData.quarter}|${quarter}`);

  promises.push(compareExportedEmissions('daily_backstop', jsonData.dailyBackstopData, dailyBackstopProps, year, quarter, locations, client));
  promises.push(compareExportedEmissions('daily_emission', jsonData.dailyEmissionData, dailyEmissionProps, year, quarter, locations, client));
  promises.push(compareExportedEmissions('weekly_test_summary', jsonData.weeklyTestSummaryData, weeklyTestSummaryProps, year, quarter, locations, client));  
  promises.push(compareExportedEmissions('summary_value', jsonData.summaryValueData, summaryValueProps, year, quarter, locations, client));
  promises.push(compareExportedEmissions('daily_test_summary', jsonData.dailyTestSummaryData, dailyTestSummaryProps, year, quarter, locations, client));
  promises.push(compareExportedEmissions('hrly_op_data', jsonData.hourlyOperatingData, hourlyOperatingProps, year, quarter, locations, client));
  promises.push(compareExportedEmissions('long_term_fuel_flow', jsonData.longTermFuelFlowData, longTermFuelFlowProps, year, quarter, locations, client));
  promises.push(compareExportedEmissions('sorbent_trap', jsonData.sorbentTrapData, sorbentTrapProps, year, quarter, locations, client));
  promises.push(compareExportedEmissions('nsps4t_summary', jsonData.nsps4tSummaryData, nsps4tSummaryProps, year, quarter, locations, client));

  let results = await Promise.all(promises);
  results.forEach(r => differences.push(...r));

  console.log('Export differences show JSON values followed by database values...', differences);

  if (!user) {
    console.log('Signing into ECMPS for import & evaluation comparison...');
    response = await signIn();
    user = response.data;
  }

  console.log(`Importing emissions data...`);
  try {
    response = await importEmissions(jsonData, user.token);
  } catch(err) {
    console.log('error: ', err);
  }

  if (response.data.message === `Successfully Imported Emissions Data for Facility Id/Oris Code [${orisCode}]`) {
    promises = [];
    differences = [];

    promises.push(compareEmissionEvaluation(emissionEvaluationProps, monPlanId, year, quarter, client));
    promises.push(compareImportedEmissions('daily_backstop', dailyBackstopProps, year, quarter, locations, client));
    promises.push(compareImportedEmissions('daily_emission', dailyEmissionProps, year, quarter, locations, client));
    promises.push(compareImportedEmissions('daily_fuel', dailyFuelProps, year, quarter, locations, client));
    promises.push(compareImportedEmissions('weekly_test_summary', weeklyTestSummaryProps, year, quarter, locations, client));
    promises.push(compareImportedEmissions('weekly_system_integrity', weeklySystemIntegrityProps, year, quarter, locations, client));
    promises.push(compareImportedEmissions('summary_value', summaryValueProps, year, quarter, locations, client));
    promises.push(compareImportedEmissions('daily_test_summary', dailyTestSummaryProps, year, quarter, locations, client));
    //promises.push(compareImportedEmissions('daily_calibration', dailyCalibrationProps, year, quarter, locations, client));
    promises.push(compareImportedEmissions('hrly_op_data', hourlyOperatingProps, year, quarter, locations, client));
    promises.push(compareImportedEmissions('monitor_hrly_value', monitorHourlyValueProps, year, quarter, locations, client));
    promises.push(compareImportedEmissions('mats_monitor_hrly_value', matsMonitorHourlyValueProps, year, quarter, locations, client));
    promises.push(compareImportedEmissions('derived_hrly_value', derivedHourlyValueProps, year, quarter, locations, client));
    promises.push(compareImportedEmissions('mats_derived_hrly_value', matsDerivedHourlyValueProps, year, quarter, locations, client));
    promises.push(compareImportedEmissions('hrly_fuel_flow', hourlyFuelFlowProps, year, quarter, locations, client));
    promises.push(compareImportedEmissions('hrly_param_fuel_flow', hourlyParameterFuelFlowProps, year, quarter, locations, client));
    promises.push(compareImportedEmissions('hrly_gas_flow_meter', hourlyGFMProps, year, quarter, locations, client));
    promises.push(compareImportedEmissions('long_term_fuel_flow', longTermFuelFlowProps, year, quarter, locations, client));
    promises.push(compareImportedEmissions('sorbent_trap', sorbentTrapProps, year, quarter, locations, client));
    promises.push(compareImportedEmissions('sampling_train', samplingTrainProps, year, quarter, locations, client));
    promises.push(compareImportedEmissions('nsps4t_summary', nsps4tSummaryProps, year, quarter, locations, client));
    promises.push(compareImportedEmissions('nsps4t_compliance_period', nsps4tCompliancePeriodProps, year, quarter, locations, client));
    promises.push(compareImportedEmissions('nsps4t_annual', nsps4tFourthQuarterProps, year, quarter, locations, client));

    results = await Promise.all(promises);
    results.forEach(r => differences.push(...r));

    console.log('Import differences show official values followed by workspace values...', differences);
  } else {
    console.log('errors: ', response.data);
  }

  if (user) {
    await signOut(user.token);
    console.log('Comparison complete & signed out of ECMPS...');
  }

  client.release();
  pgPool.end();
}