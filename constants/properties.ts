export const emissionEvaluationProps = [
  { json: null, db: 'mon_plan_id', type: 'string' },
  { json: null, db: 'rpt_period_id', type: 'number' },
  { json: null, db: 'last_updated', type: 'timestamp' },
  { json: null, db: 'updated_status_flg', type: 'string' },
  { json: null, db: 'needs_eval_flg', type: 'string', wksValue: 'Y' },
  { json: null, db: 'chk_session_id', type: 'string', wksValue: null },
  { json: null, db: 'submission_id', type: 'number', wksValue: null },
  { json: null, db: 'submission_availability_cd', type: 'string', wksValue: 'GRANTED' },
  { json: null, db: 'eval_status_cd', type: 'string', wksValue: 'EVAL' },
];

export const dailyBackstopProps = [
  { json: null, db: 'mon_loc_id', type: 'string', orderBy: true },
  { json: null, db: 'rpt_period_id', type: 'number', orderBy: true },
  { json: null, db: 'unit_id', type: 'string', orderBy: true },
  { json: 'date', db: 'op_date', type: 'date', orderBy: true },
  { json: 'dailyNOxEmissions', db: 'daily_noxm', type: 'number' },
  { json: 'dailyHeatInput', db: 'daily_hit', type: 'number' },
  { json: 'dailyAverageNOxRate', db: 'daily_avg_noxr', type: 'number' },
  { json: 'dailyNOxExceedence', db: 'daily_noxm_exceed', type: 'number' },
  { json: 'cumulativeOSNOxExceedence', db: 'cumulative_os_noxm_exceed', type: 'number' },
];

export const dailyEmissionProps = [
  { json: null, db: 'mon_loc_id', type: 'string', orderBy: true },
  { json: null, db: 'rpt_period_id', type: 'number', orderBy: true },
  { json: 'date', db: 'begin_date', type: 'date', orderBy: true },
  { json: 'parameterCode', db: 'parameter_cd', type: 'string', orderBy: true },
  { json: 'totalDailyEmissions', db: 'total_daily_emission', type: 'number' },
  { json: 'totalCarbonBurned', db: 'total_carbon_burned', type: 'number' },
  { json: 'adjustedDailyEmissions', db: 'adjusted_daily_emission', type: 'number' },
  { json: 'unadjustedDailyEmissions', db: 'unadjusted_daily_emission', type: 'number' },
  { json: 'sorbentRelatedMassEmissions', db: 'sorbent_mass_emission', type: 'number' },
];

export const dailyFuelProps = [
  { json: null, db: 'mon_loc_id', type: 'string', orderBy: true },
  { json: null, db: 'rpt_period_id', type: 'number', orderBy: true },
  { json: 'fuelCode', db: 'fuel_cd', type: 'string' },
  { json: 'dailyFuelFeed', db: 'daily_fuel_feed', type: 'number' },
  { json: 'carbonContentUsed', db: 'carbon_content_used', type: 'number' },
  { json: 'fuelCarbonBurned', db: 'fuel_carbon_burned', type: 'number' },
];

export const weeklyTestSummaryProps = [
  { json: null, db: 'mon_loc_id', type: 'string', orderBy: true },
  { json: null, db: 'rpt_period_id', type: 'number', orderBy: true },
  { json: null, db: 'mon_sys_id', type: 'string' },
  { json: null, db: 'component_id', type: 'string' },
  { json: 'testTypeCode', db: 'test_type_cd', type: 'string', orderBy: true },
  { json: 'date', db: 'test_date', type: 'date', orderBy: true },
  { json: 'hour', db: 'test_hour', type: 'number', orderBy: true },
  { json: 'minute', db: 'test_min', type: 'number', orderBy: true },
  { json: 'componentId', db: 'component_identifier', type: 'string' },
  { json: 'testResultCode', db: 'test_result_cd', type: 'string' },
  { json: 'spanScaleCode', db: 'span_scale_cd', type: 'string' },
];

export const weeklySystemIntegrityProps = [
  { json: null, db: 'mon_loc_id', type: 'string', orderBy: true },
  { json: null, db: 'rpt_period_id', type: 'number', orderBy: true },
  { json: 'gasLevelCode', db: 'gas_level_cd', type: 'string' },
  { json: 'referenceValue', db: 'ref_value', type: 'number' },
  { json: 'measuredValue', db: 'measured_value', type: 'number' },
  { json: 'apsIndicator', db: 'aps_ind', type: 'number' },
  { json: 'systemIntegrityError', db: 'system_integrity_error', type: 'string' },
];

export const summaryValueProps = [
  { json: null, db: 'mon_loc_id', type: 'string', orderBy: true },
  { json: null, db: 'rpt_period_id', type: 'number', orderBy: true },
  { json: 'parameterCode', db: 'parameter_cd', type: 'string', orderBy: true },
  { json: 'currentReportingPeriodTotal', db: 'current_rpt_period_total', type: 'number' },
  { json: 'ozoneSeasonToDateTotal', db: 'os_total', type: 'number' },
  { json: 'yearToDateTotal', db: 'year_total', type: 'number' },
];

export const dailyTestSummaryProps = [
  { json: null, db: 'mon_loc_id', type: 'string', orderBy: true },
  { json: null, db: 'rpt_period_id', type: 'number', orderBy: true },
  { json: null, db: 'mon_sys_id', type: 'string' },
  { json: null, db: 'component_id', type: 'string' },
  { json: 'testTypeCode', db: 'test_type_cd', type: 'string', orderBy: true },
  { json: 'testResultCode', db: 'test_result_cd', type: 'string', orderBy: true },
  { json: 'date', db: 'daily_test_date', type: 'date', orderBy: true },
  { json: 'hour', db: 'daily_test_hour', type: 'number', orderBy: true },
  { json: 'minute', db: 'daily_test_min', type: 'number', orderBy: true },
  { json: 'monitoringSystemId', db: 'system_identifier', type: 'string' },
  { json: 'componentId', db: 'component_identifier', type: 'string' },
  { json: 'spanScaleCode', db: 'span_scale_cd', type: 'string' },
];

export const dailyCalibrationProps = [
  { json: null, db: 'rpt_period_id', type: 'number', orderBy: true },
  { json: 'onLineOffLineIndicator', db: 'online_offline_ind', type: 'number' },
  { json: 'upscaleGasCode', db: 'upscale_gas_level_cd', type: 'string' },
  { json: 'zeroInjectionDate', db: 'zero_injection_date', type: 'date' },
  { json: 'zeroInjectionHour', db: 'zero_injection_hour', type: 'number' },
  { json: 'zeroInjectionMinute', db: 'zero_injection_min', type: 'number' },
  { json: 'upscaleInjectionDate', db: 'upscale_injection_date', type: 'date' },
  { json: 'upscaleInjectionHour', db: 'upscale_injection_hour', type: 'number' },
  { json: 'upscaleInjectionHour', db: 'upscale_injection_min', type: 'number' },
  { json: 'zeroMeasuredValue', db: 'zero_measured_value', type: 'number' },
  { json: 'upscaleMeasuredValue', db: 'upscale_measured_value', type: 'number' },
  { json: 'zeroAPSIndicator', db: 'zero_aps_ind', type: 'number' },
  { json: 'upscaleAPSIndicator', db: 'upscale_aps_ind', type: 'number' },
  { json: 'ZeroCalibrationError', db: 'zero_cal_error', type: 'number' },
  { json: 'upscaleCalibrationError', db: 'upscale_cal_error', type: 'number' },
  { json: 'zeroReferenceValue', db: 'zero_ref_value', type: 'number' },
  { json: 'upscaleReferenceValue', db: 'upscale_ref_value', type: 'number' },
  { json: 'upscaleGasTypeCode', db: 'upscale_gas_type_cd', type: 'string' },
  { json: 'cylinderIdentifier', db: 'cylinder_identifier', type: 'string' },
  { json: 'vendorIdentifier', db: 'vendor_id', type: 'string' },
  { json: 'expirationDate', db: 'expiration_date', type: 'date' },
  { json: 'injectionProtocolCode', db: 'injection_protocol_cd', type: 'string' },
];

export const hourlyOperatingProps = [
  { json: null, db: 'mon_loc_id', type: 'string', orderBy: true },
  { json: null, db: 'rpt_period_id', type: 'number', orderBy: true },
  { json: 'date', db: 'begin_date', type: 'date', orderBy: true },
  { json: 'hour', db: 'begin_hour', type: 'number', orderBy: true },
  { json: 'operatingTime', db: 'op_time', type: 'number' },
  { json: 'hourLoad', db: 'hr_load', type: 'number' },
  { json: 'loadUnitsOfMeasureCode', db: 'load_uom_cd', type: 'string' },
  { json: 'matsHourLoad', db: 'mats_load', type: 'number' },
  { json: 'loadRange', db: 'load_range', type: 'number' },
  { json: 'commonStackLoadRange', db: 'common_stack_load_range', type: 'number' },
  { json: 'fcFactor', db: 'fc_factor', type: 'number' },
  { json: 'fdFactor', db: 'fd_factor', type: 'number' },
  { json: 'fwFactor', db: 'fw_factor', type: 'number' },
  { json: 'fuelCode', db: 'fuel_cd', type: 'string' },
  { json: 'matsStartupShutdownFlag', db: 'mats_startup_shutdown_flg', type: 'string' },
  { json: null, db: 'multi_fuel_flg', type: 'string' },
  { json: null, db: 'operating_condition_cd', type: 'string' },
  { json: null, db: 'fuel_cd_list', type: 'string' },
  { json: null, db: 'mhhi_indicator', type: 'number' },
];

export const monitorHourlyValueProps = [
  { json: null, db: 'mon_loc_id', type: 'string', orderBy: true },
  { json: null, db: 'rpt_period_id', type: 'number', orderBy: true },
  { json: null, db: 'mon_sys_id', type: 'string' },
  { json: null, db: 'component_id', type: 'string' },
  { json: 'parameterCode', db: 'parameter_cd', type: 'string', orderBy: true },
  { json: 'monitoringSystemId', db: 'system_identifier', type: 'string' },
  { json: 'componentId', db: 'component_identifier', type: 'string' },
  { json: 'unadjustedHourlyValue', db: 'unadjusted_hrly_value', type: 'number', orderBy: true },
  { json: 'adjustedHourlyValue', db: 'adjusted_hrly_value', type: 'number' },
  { json: 'modcCode', db: 'modc_cd', type: 'string' },
  { json: 'percentAvailable', db: 'pct_available', type: 'number' },
  { json: 'moistureBasis', db: 'moisture_basis', type: 'string' },
];

export const matsMonitorHourlyValueProps = [
  { json: null, db: 'mon_loc_id', type: 'string', orderBy: true },
  { json: null, db: 'rpt_period_id', type: 'number', orderBy: true },
  { json: null, db: 'mon_sys_id', type: 'string' },
  { json: null, db: 'component_id', type: 'string' },
  { json: 'parameterCode', db: 'parameter_cd', type: 'string', orderBy: true },
  { json: 'unadjustedHourlyValue', db: 'unadjusted_hrly_value', type: 'string', orderBy: true },
  { json: 'modcCode', db: 'modc_cd', type: 'string' },
  { json: 'monitoringSystemId', db: 'system_identifier', type: 'string' },
  { json: 'componentId', db: 'component_identifier', type: 'string' },
  { json: 'percentAvailable', db: 'pct_available', type: 'number' },
];

export const derivedHourlyValueProps = [
  { json: null, db: 'mon_loc_id', type: 'string', orderBy: true },
  { json: null, db: 'rpt_period_id', type: 'number', orderBy: true },
  { json: null, db: 'mon_sys_id', type: 'string' },
  { json: null, db: 'mon_form_id', type: 'string' },
  { json: 'parameterCode', db: 'parameter_cd', type: 'string', orderBy: true },
  { json: 'monitoringSystemId', db: 'system_identifier', type: 'string' },
  { json: 'formulaId', db: 'formula_identifier', type: 'string' },
  { json: 'unadjustedHourlyValue', db: 'unadjusted_hrly_value', type: 'number' },
  { json: 'adjustedHourlyValue', db: 'adjusted_hrly_value', type: 'number', orderBy: true },
  { json: 'modcCode', db: 'modc_cd', type: 'string' },
  { json: 'percentAvailable', db: 'pct_available', type: 'number' },
  { json: 'operatingConditionCode', db: 'operating_condition_cd', type: 'string' },
  { json: 'segmentNumber', db: 'segment_num', type: 'number' },
  { json: 'fuelCode', db: 'fuel_cd', type: 'string' },
];

export const matsDerivedHourlyValueProps = [
  { json: null, db: 'mon_loc_id', type: 'string', orderBy: true },
  { json: null, db: 'rpt_period_id', type: 'number', orderBy: true },
  { json: null, db: 'mon_form_id', type: 'string' },
  { json: 'parameterCode', db: 'parameter_cd', type: 'string', orderBy: true },
  { json: 'unadjustedHourlyValue', db: 'unadjusted_hrly_value', type: 'string', orderBy: true },
  { json: 'modcCode', db: 'modc_cd', type: 'string' },
  { json: 'formulaId', db: 'formula_identifier', type: 'string' },
];

export const hourlyFuelFlowProps = [
  { json: null, db: 'mon_loc_id', type: 'string', orderBy: true },
  { json: null, db: 'rpt_period_id', type: 'number', orderBy: true },
  { json: null, db: 'mon_sys_id', type: 'string' },
  { json: 'fuelCode', db: 'fuel_cd', type: 'string', orderBy: true },
  { json: 'fuelUsageTime', db: 'fuel_usage_time', type: 'number' },
  { json: 'volumetricFlowRate', db: 'volumetric_flow_rate', type: 'number', orderBy: true },
  { json: 'volumetricUnitsOfMeasureCode', db: 'volumetric_uom_cd', type: 'string' },
  { json: 'sourceOfDataVolumetricCode', db: 'sod_volumetric_cd', type: 'string' },
  { json: 'massFlowRate', db: 'mass_flow_rate', type: 'number' },
  { json: 'sourceOfDataMassCode', db: 'sod_mass_cd', type: 'string' },
  { json: 'monitoringSystemId', db: 'system_identifier', type: 'string' },
];

export const hourlyParameterFuelFlowProps = [
  { json: null, db: 'mon_loc_id', type: 'string', orderBy: true },
  { json: null, db: 'rpt_period_id', type: 'number', orderBy: true },
  { json: null, db: 'mon_sys_id', type: 'string' },
  { json: null, db: 'mon_form_id', type: 'string' },
  { json: 'parameterCode', db: 'parameter_cd', type: 'string', orderBy: true },
  { json: 'parameterValueForFuel', db: 'param_val_fuel', type: 'number' },
  { json: 'formulaId', db: 'formula_identifier', type: 'string' },
  { json: 'sampleTypeCode', db: 'sample_type_cd', type: 'string' },
  { json: 'monitoringSystemId', db: 'system_identifier', type: 'string' },
  { json: 'operatingConditionCode', db: 'operating_condition_cd', type: 'string' },
  { json: 'segmentNumber', db: 'segment_num', type: 'number' },
  { json: 'parameterUnitsOfMeasureCode', db: 'parameter_uom_cd', type: 'string' },
];

export const hourlyGFMProps = [
  { json: null, db: 'mon_loc_id', type: 'string', orderBy: true },
  { json: null, db: 'rpt_period_id', type: 'number', orderBy: true },
  { json: null, db: 'component_id', type: 'string' },
  { json: 'componentId', db: 'component_identifier', type: 'string', orderBy: true },
  { json: 'beginEndHourFlag', db: 'begin_end_hour_flg', type: 'string' },
  { json: 'hourlyGFMReading', db: 'gfm_reading', type: 'number' },
  { json: 'averageHourlySamplingRate', db: 'avg_sampling_rate', type: 'number' },
  { json: 'samplingRateUnitsOfMeasure', db: 'sampling_rate_uom', type: 'string' },
  { json: 'hourlySFSRRatio', db: 'flow_to_sampling_ratio', type: 'number' },
];

export const longTermFuelFlowProps = [
  { json: null, db: 'mon_loc_id', type: 'string', orderBy: true },
  { json: null, db: 'rpt_period_id', type: 'number', orderBy: true },
  { json: null, db: 'mon_sys_id', type: 'string' },
  { json: 'monitoringSystemId', db: 'system_identifier', type: 'string', orderBy: true },
  { json: 'fuelFlowPeriodCode', db: 'fuel_flow_period_cd', type: 'string' },
  { json: 'longTermFuelFlowValue', db: 'long_term_fuel_flow_value', type: 'number' },
  { json: 'longTermFuelFlowUnitsOfMeasureCode', db: 'ltff_uom_cd', type: 'string' },
  { json: 'grossCalorificValue', db: 'gross_calorific_value', type: 'number' },
  { json: 'gcvUnitsOfMeasureCode', db: 'gcv_uom_cd', type: 'string' },
  { json: 'totalHeatInput', db: 'total_heat_input', type: 'number' },
];

export const sorbentTrapProps = [
  { json: null, db: 'mon_loc_id', type: 'string', orderBy: true },
  { json: null, db: 'rpt_period_id', type: 'number', orderBy: true },
  { json: null, db: 'mon_sys_id', type: 'string' },  
  { json: 'monitoringSystemId', db: 'system_identifier', type: 'string', orderBy: true },
  { json: 'beginDate', db: 'begin_date', type: 'date', orderBy: true },
  { json: 'beginHour', db: 'begin_hour', type: 'number', orderBy: true },
  { json: 'endDate', db: 'end_date', type: 'date' },
  { json: 'endHour', db: 'end_hour', type: 'number' },
  { json: 'hgSystemConcentration', db: 'hg_concentration', type: 'string' },
  { json: 'pairedTrapAgreement', db: 'paired_trap_agreement', type: 'number' },
  { json: 'absoluteDifferenceIndicator', db: 'absolute_difference_ind', type: 'number' },
  { json: 'modcCode', db: 'modc_cd', type: 'string' },
  { json: 'rataIndicator', db: 'rata_ind', type: 'number' },
  { json: 'apsCode', db: 'sorbent_trap_aps_cd', type: 'string' },
];

export const samplingTrainProps = [
  { json: null, db: 'mon_loc_id', type: 'string', orderBy: true },
  { json: null, db: 'rpt_period_id', type: 'number', orderBy: true },
  { json: null, db: 'component_id', type: 'string' },
  { json: 'componentId', db: 'component_identifier', type: 'string', orderBy: true },
  { json: 'sorbentTrapSN', db: 'sorbent_trap_serial_number', type: 'string' },
  { json: 'mainTrapHg', db: 'main_trap_hg', type: 'string' },
  { json: 'btTrapHg', db: 'breakthrough_trap_hg', type: 'string' },
  { json: 'spikeTrapHg', db: 'spike_trap_hg', type: 'string' },
  { json: 'spikeReferenceValue', db: 'spike_ref_value', type: 'string' },
  { json: 'totalSampleVolumeDSCM', db: 'total_sample_volume', type: 'number' },
  { json: 'referenceSFSRRatio', db: 'ref_flow_to_sampling_ratio', type: 'number' },
  { json: 'samplingRatioCheckResultCode', db: 'sampling_ratio_test_result_cd', type: 'string' },
  { json: 'hgConcentration', db: 'hg_concentration', type: 'string' },
  { json: 'postLeakCheckResultCode', db: 'post_leak_test_result_cd', type: 'string' },
  { json: 'percentBreakthrough', db: 'percent_breakthrough', type: 'number' },
  { json: 'percentSpikeRecovery', db: 'percent_spike_recovery', type: 'number' },
  { json: 'trainQAStatusCode', db: 'train_qa_status_cd', type: 'string' },
  { json: 'sampleDamageExplanation', db: 'sample_damage_explanation', type: 'string' },
];

export const nsps4tSummaryProps = [
  { json: null, db: 'mon_loc_id', type: 'string', orderBy: true },
  { json: null, db: 'rpt_period_id', type: 'number', orderBy: true },
  { json: 'co2EmissionStandardCode', db: 'emission_standard_cd', type: 'string' },
  { json: 'modusValue', db: 'modus_value', type: 'number' },
  { json: 'modusUnitsOfMeasureCode', db: 'modus_uom_cd', type: 'string' },
  { json: 'electricalLoadCode', db: 'electrical_load_cd', type: 'string' },
  { json: 'noCompliancePeriodEndedIndicator', db: 'no_period_ended_ind', type: 'number' },
  { json: 'noCompliancePeriodEndedComment', db: 'no_period_ended_comment', type: 'string' },
];

export const nsps4tCompliancePeriodProps = [
  { json: null, db: 'mon_loc_id', type: 'string', orderBy: true },
  { json: null, db: 'rpt_period_id', type: 'number', orderBy: true },
  { json: 'beginYear', db: 'begin_year', type: 'number', orderBy: true },
  { json: 'beginMonth', db: 'begin_month', type: 'number', orderBy: true },
  { json: 'endYear', db: 'end_year', type: 'number' },
  { json: 'endMonth', db: 'end_month', type: 'number' },
  { json: 'averageCO2EmissionRate', db: 'avg_co2_emission_rate', type: 'number' },
  { json: 'co2EmissionRateUnitsOfMeasureCode', db: 'co2_emission_rate_uom_cd', type: 'string' },
  { json: 'percentValidOpHours', db: 'pct_valid_op_hours', type: 'number' },
  { json: 'violationOfCO2StandardIndicator', db: 'co2_violation_ind', type: 'number' },
  { json: 'violationOfCO2StandardComment', db: 'co2_violation_comment', type: 'string' },
];

export const nsps4tFourthQuarterProps = [
  { json: null, db: 'mon_loc_id', type: 'string', orderBy: true },
  { json: null, db: 'rpt_period_id', type: 'number', orderBy: true },
  { json: 'annualEnergySold', db: 'annual_energy_sold', type: 'number' },
  { json: 'annualEnergySoldTypeCode', db: 'annual_energy_sold_type_cd', type: 'string' },
  { json: 'annualPotentialElectricOutput', db: 'annual_potential_output', type: 'number' },
];