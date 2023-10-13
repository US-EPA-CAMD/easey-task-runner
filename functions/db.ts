import { PoolClient } from 'pg';

export const getLocationData = async (
  orisCode: number,
  config: string,
  year: number,
  quarter: number,
  client: PoolClient,
) => {
  const params = [orisCode, config.split(', '), year, quarter];
  const sql = `
    SELECT
      p.fac_id, p.oris_code, p.facility_name, mp.mon_plan_id, ml.mon_loc_id, u.unit_id, u.unitid, sp.stack_pipe_id, sp.stack_name, rp.rpt_period_id
    FROM camdecmpsmd.reporting_period AS rp, camd.plant AS p
    JOIN camdecmps.monitor_plan AS mp USING(fac_id)
    JOIN camdecmps.monitor_plan_location AS mpl USING(mon_plan_id)
    JOIN camdecmps.monitor_location AS ml USING(mon_loc_id)
    LEFT JOIN camdecmps.stack_pipe AS sp USING(stack_pipe_id)
    LEFT JOIN camd.unit AS u USING(unit_id)
    WHERE p.oris_code = $1 AND mp.end_rpt_period_id IS NULL AND (
      unitid = ANY($2) OR
      stack_name = ANY($2)
    ) AND rp.calendar_year = $3 AND rp.quarter = $4`;

  //console.log('sql: ', sql);
  //console.log('params: ', params);

  const dbResults = await client.query(sql, params);
  return dbResults.rows;
}

export const getEmissionEvaluationData = async (
  schema: string,
  monPlanId: string,
  year: number,
  quarter: number,
  client: PoolClient,
) => {
  const params = [monPlanId, year, quarter];
  const sql = `
    SELECT t.*
    FROM ${schema}.emission_evaluation AS t
    JOIN camdecmpsmd.reporting_period rp USING(rpt_period_id)
    WHERE t.mon_plan_id = $1 AND rp.calendar_year = $2 AND rp.quarter = $3`;

  //console.log('sql: ', sql);
  //console.log('params: ', params);

  const dbResults = await client.query(sql, params);
  return dbResults.rows;
}

export const getEmissionsData = async (
  schema: string,
  tableName: string,
  props: any[],
  year: number,
  quarter: number,
  locations: string[],
  client: PoolClient,
  orderData: boolean = false,
) => {
  let monSysId = '';
  let monSysIdJoin = '';
  let componentId = '';
  let componentIdJoin = '';
  let formulaId = '';
  let formulaIdJoin = '';
  const params = [year, quarter, locations];

  if (props.find(p => p.json === 'componentId')) {
    componentIdJoin = `LEFT JOIN ${schema}.component AS c USING(component_id)`;
    componentId = ', c.component_identifier'
  }

  if (props.find(p => p.json === 'monitoringSystemId')) {
    monSysIdJoin = `LEFT JOIN ${schema}.monitor_system AS ms USING(mon_sys_id)`;
    monSysId = ', ms.system_identifier'
  }

  if (props.find(p => p.json === 'formulaId')) {
    formulaIdJoin = `LEFT JOIN ${schema}.monitor_formula AS mf USING(mon_form_id)`;
    formulaId = ', mf.formula_identifier'
  }

  const orderByProps = props.filter(p => p.orderBy === true);
  const orderBy = `ORDER BY ${orderByProps.map(p => p.db).join(', ')}`;

  const sql = `
    SELECT t.*, sp.stack_name, u.unitid AS unit_name${componentId}${monSysId}${formulaId}
    FROM ${schema}.${tableName} AS t
    JOIN camdecmpsmd.reporting_period rp USING(rpt_period_id)
    JOIN ${schema}.monitor_location AS ml USING(mon_loc_id)
    ${componentIdJoin}
    ${monSysIdJoin}
    ${formulaIdJoin}
    LEFT JOIN ${schema}.stack_pipe AS sp USING(stack_pipe_id)
    LEFT JOIN camd.unit AS u ON ml.unit_id = u.unit_id
    WHERE rp.calendar_year = $1 AND rp.quarter = $2 AND t.mon_loc_id = ANY($3)
    ${orderData ? orderBy : ''}`;

    console.log('sql: ', sql);
    console.log('params: ', params);

    const dbResults = await client.query(sql, params);
    return dbResults.rows;
}
