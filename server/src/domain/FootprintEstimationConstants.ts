/*
 * © 2020 ThoughtWorks, Inc. All rights reserved.
 */

import { AWS_REGIONS } from '@services/aws/AWSRegions'
import { GCP_REGIONS } from '@services/gcp/GCPRegions'

type CloudConstantsByProvider = {
  SSDCOEFFICIENT: number
  HDDCOEFFICIENT: number
  MIN_WATTS: number
  MAX_WATTS: number
  PUE_AVG: number
  PUE_TRAILING_TWELVE_MONTH?: { [key: string]: number }
  getPUE: (region?: string) => number
  AVG_CPU_UTILIZATION_2020: number
}

type CloudConstants = {
  [cloudProvider: string]: CloudConstantsByProvider
}

export const CLOUD_CONSTANTS: CloudConstants = {
  GCP: {
    SSDCOEFFICIENT: 1.2,
    HDDCOEFFICIENT: 0.65,
    MIN_WATTS: 0.58,
    MAX_WATTS: 3.54,
    PUE_AVG: 1.1,
    PUE_TRAILING_TWELVE_MONTH: {
      [GCP_REGIONS.US_EAST1]: 1.102,
      [GCP_REGIONS.US_CENTRAL1]: 1.11,
      [GCP_REGIONS.US_WEST1]: 1.095,
      [GCP_REGIONS.EUROPE_WEST1]: 1.08,
      [GCP_REGIONS.EUROPE_WEST4]: 1.09,
      [GCP_REGIONS.EUROPE_NORTH1]: 1.09,
      [GCP_REGIONS.ASIA_EAST1]: 1.13,
      [GCP_REGIONS.ASIA_SOUTHEAST1]: 1.14,
      [GCP_REGIONS.SOUTHAMERICA_EAST1]: 1.09,
    },
    getPUE: (region: string) => {
      return CLOUD_CONSTANTS.GCP.PUE_TRAILING_TWELVE_MONTH[region]
        ? CLOUD_CONSTANTS.GCP.PUE_TRAILING_TWELVE_MONTH[region]
        : CLOUD_CONSTANTS.GCP.PUE_AVG
    },
    AVG_CPU_UTILIZATION_2020: 50,
  },
  AWS: {
    SSDCOEFFICIENT: 1.2,
    HDDCOEFFICIENT: 0.65,
    MIN_WATTS: 0.59,
    MAX_WATTS: 3.5,
    PUE_AVG: 1.2,
    getPUE: () => {
      return CLOUD_CONSTANTS.AWS.PUE_AVG
    },
    AVG_CPU_UTILIZATION_2020: 50,
  },
}

const US_NERC_REGIONS_EMISSIONS_FACTORS: { [nercRegion: string]: number } = {
  RFC: 0.000000475105,
  SERC: 0.0000004545,
  WECC: 0.000000351533,
  MRO: 0.000000540461,
}

export const CLOUD_PROVIDER_WATT_HOURS_CARBON_RATIOS: { [cloudProvider: string]: { [region: string]: number } } = {
  AWS: {
    [AWS_REGIONS.US_EAST_1]: US_NERC_REGIONS_EMISSIONS_FACTORS.SERC,
    [AWS_REGIONS.US_EAST_2]: US_NERC_REGIONS_EMISSIONS_FACTORS.RFC,
    [AWS_REGIONS.US_WEST_1]: US_NERC_REGIONS_EMISSIONS_FACTORS.WECC,
    [AWS_REGIONS.US_WEST_2]: US_NERC_REGIONS_EMISSIONS_FACTORS.WECC,
    [AWS_REGIONS.AF_SOUTH_1]: 0.000000928,
    [AWS_REGIONS.AP_EAST_1]: 0.00000081,
    [AWS_REGIONS.AP_SOUTH_1]: 0.000000708,
    [AWS_REGIONS.AP_NORTHEAST_3]: 0.000000506,
    [AWS_REGIONS.AP_NORTHEAST_2]: 0.0000005,
    [AWS_REGIONS.AP_SOUTHEAST_1]: 0.0000004188,
    [AWS_REGIONS.AP_SOUTHEAST_2]: 0.00000079,
    [AWS_REGIONS.AP_NORTHEAST_1]: 0.000000506,
    [AWS_REGIONS.CA_CENTRAL_1]: 0.00000013,
    [AWS_REGIONS.CN_NORTH_1]: 0.000000555,
    [AWS_REGIONS.CN_NORTHWEST_1]: 0.000000555,
    [AWS_REGIONS.EU_CENTRAL_1]: 0.00000037862,
    [AWS_REGIONS.EU_WEST_1]: 0.00000034804,
    [AWS_REGIONS.EU_WEST_2]: 0.00000023314,
    [AWS_REGIONS.EU_SOUTH_1]: 0.00000033854,
    [AWS_REGIONS.EU_WEST_3]: 0.00000003895,
    [AWS_REGIONS.EU_NORTH_1]: 0.00000001189,
    [AWS_REGIONS.ME_SOUTH_1]: 0.000000732,
    [AWS_REGIONS.SA_EAST_1]: 0.000000074,
    [AWS_REGIONS.US_GOV_EAST_1]: US_NERC_REGIONS_EMISSIONS_FACTORS.SERC,
    [AWS_REGIONS.US_GOV_WEST_1]: US_NERC_REGIONS_EMISSIONS_FACTORS.WECC,
  },
  GCP: {
    [GCP_REGIONS.ASIA_EAST1]: 0.000000554,
    [GCP_REGIONS.ASIA_EAST2]: 0.00000081,
    [GCP_REGIONS.ASIA_NORTHEAST1]: 0.000000506,
    [GCP_REGIONS.ASIA_NORTHEAST2]: 0.000000506,
    [GCP_REGIONS.ASIA_NORTHEAST3]: 0.0000005,
    [GCP_REGIONS.ASIA_SOUTH1]: 0.000000708,
    [GCP_REGIONS.ASIA_SOUTHEAST1]: 0.0000004188,
    [GCP_REGIONS.ASIA_SOUTHEAST2]: 0.000000761,
    [GCP_REGIONS.AUSTRALIA_SOUTHEAST1]: 0.00000079,
    [GCP_REGIONS.EUROPE_NORTH1]: 0.00000013622,
    [GCP_REGIONS.EUROPE_WEST1]: 0.00000015313,
    [GCP_REGIONS.EUROPE_WEST2]: 0.00000023314,
    [GCP_REGIONS.EUROPE_WEST3]: 0.00000037862,
    [GCP_REGIONS.EUROPE_WEST4]: 0.00000045207,
    [GCP_REGIONS.EUROPE_WEST6]: 0.00000001182,
    [GCP_REGIONS.NORTHAMERICA_NORTHEAST1]: 0.00000013,
    [GCP_REGIONS.SOUTHAMERICA_EAST1]: 0.000000074,
    [GCP_REGIONS.US_CENTRAL1]: US_NERC_REGIONS_EMISSIONS_FACTORS.MRO,
    [GCP_REGIONS.US_EAST1]: US_NERC_REGIONS_EMISSIONS_FACTORS.SERC,
    [GCP_REGIONS.US_EAST4]: US_NERC_REGIONS_EMISSIONS_FACTORS.SERC,
    [GCP_REGIONS.US_WEST1]: US_NERC_REGIONS_EMISSIONS_FACTORS.WECC,
    [GCP_REGIONS.US_WEST2]: US_NERC_REGIONS_EMISSIONS_FACTORS.WECC,
    [GCP_REGIONS.US_WEST3]: US_NERC_REGIONS_EMISSIONS_FACTORS.WECC,
    [GCP_REGIONS.US_WEST4]: US_NERC_REGIONS_EMISSIONS_FACTORS.WECC,
    [GCP_REGIONS.UNKNOWN]: 0.0000004153497083, // Average of the above regions
  },
}

export function estimateCo2(estimatedWattHours: number, cloudProvider: string, region: string): number {
  return estimatedWattHours * CLOUD_PROVIDER_WATT_HOURS_CARBON_RATIOS[cloudProvider][region]
}
