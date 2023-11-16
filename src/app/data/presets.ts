export const types = ["QA", "Data2Text"] as const;

export type TaskType = (typeof types)[number];

export interface Preset {
  id: string;
  name: string;
  type?: TaskType;
  description?: string;
}

export const presets: Preset[] = [
  {
    id: "9cb0e66a-9937-465d-a188-2c4c4ae2401f",
    name: "Financial data Question Answering",
    description:
      "Given an JSON object with financial data, answer questions about it.",
  },
  {
    id: "61eb0e32-2391-4cd3-adc3-66efe09bc0b7",
    name: "Describe Legal Cases",
    description: "Given a legal case metadata, describe it in plain English.",
  },
  {
    id: "a4e1fa51-f4ce-4e45-892c-224030a00bdd",
    name: "Text to command",
  },
  {
    id: "cc198b13-4933-43aa-977e-dcd95fa30770",
    name: "Q&A",
  },
  {
    id: "adfa95be-a575-45fd-a9ef-ea45386c64de",
    name: "English to other languages",
  },
  {
    id: "c569a06a-0bd6-43a7-adf9-bf68c09e7a79",
    name: "Parse unstructured data",
  },
  {
    id: "15ccc0d7-f37a-4f0a-8163-a37e162877dc",
    name: "Classification",
  },
  {
    id: "4641ef41-1c0f-421d-b4b2-70fe431081f3",
    name: "Natural language to Python",
  },
  {
    id: "48d34082-72f3-4a1b-a14d-f15aca4f57a0",
    name: "Explain code",
  },
  {
    id: "dfd42fd5-0394-4810-92c6-cc907d3bfd1a",
    name: "Chat",
  },
];

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

export interface Example {
  id: string;
  name: string;
  type: TaskType;
  data: JsonValue;
  prompt: string;
  model: string;
  symgenText: string;
  baselineText: string;
}

export const examples: Example[] = [
  {
    id: "9cb0e66a-9937-465d-assd-2c4c4ae2401f",
    name: "Financial Data Question Answering",
    type: "QA",
    model: "gpt-4-0613",
    prompt:
      "What's the difference in the Forward P/E ratio between NVDA and BABA?",
    baselineText:
      "The Forward P/E ratio for NVDA is 39.53 and for BABA is 9.79. Therefore, the difference in the Forward P/E ratio between NVDA and BABA is 39.53 - 9.79 = 29.74.",
    symgenText:
      "The Forward P/E ratio for NVDA is {{data.NVDA.ForwardPE}} and for BABA is {{data.BABA.ForwardPE}}. Therefore, the difference in the Forward P/E ratio between NVDA and BABA is {{data.NVDA.ForwardPE}} - {{data.BABA.ForwardPE}} = {{data.NVDA.ForwardPE - data.BABA.ForwardPE}}.",
    data: {
      BABA: {
        Symbol: "BABA",
        AssetType: "Common Stock",
        Name: "Alibaba Group Holding Ltd",
        Description:
          "Alibaba Group Holding Limited, also known as Alibaba Group and Alibaba.com, is a Chinese multinational technology company specializing in e-commerce, retail, Internet, and technology. Founded on 28 June 1999 in Hangzhou, Zhejiang, the company provides consumer-to-consumer (C2C), business-to-consumer (B2C), and business-to-business (B2B) sales services via web portals, as well as electronic payment services, shopping search engines and cloud computing services. It owns and operates a diverse portfolio of companies around the world in numerous business sectors.",
        CIK: 1577552,
        Exchange: "NYSE",
        Currency: "USD",
        Country: "USA",
        Sector: "TRADE & SERVICES",
        Industry: "SERVICES-BUSINESS SERVICES, NEC",
        Address:
          "26/F TOWER ONE, TIMES SQUARE, 1 MATHESON STREET, CAUSEWAY BAY, HK",
        FiscalYearEnd: "March",
        LatestQuarter: "2023-06-30",
        MarketCapitalization: 211572310000,
        EBITDA: 172349997000,
        PERatio: 18.83,
        PEGRatio: 1.187,
        BookValue: 397.45,
        DividendPerShare: 0.0,
        DividendYield: 0.0,
        EPS: 4.41,
        RevenuePerShareTTM: 345.47,
        ProfitMargin: 0.094,
        OperatingMarginTTM: 0.19,
        ReturnOnAssetsTTM: 0.0451,
        ReturnOnEquityTTM: 0.0698,
        RevenueTTM: 897287979000,
        GrossProfitTTM: 314357000000,
        DilutedEPSTTM: 4.41,
        QuarterlyEarningsGrowthYOY: 0.569,
        QuarterlyRevenueGrowthYOY: 0.139,
        AnalystTargetPrice: 139.24,
        TrailingPE: 18.83,
        ForwardPE: 9.79,
        PriceToSalesRatioTTM: 0.273,
        PriceToBookRatio: 1.772,
        EVToRevenue: 0.229,
        EVToEBITDA: 2.139,
        Beta: 0.665,
        "52WeekHigh": 121.3,
        "52WeekLow": 63.22,
        "50DayMovingAverage": 87.28,
        "200DayMovingAverage": 91.98,
        SharesOutstanding: 2546780000,
        DividendDate: "None",
        ExDividendDate: "None",
      },
      NVDA: {
        Symbol: "NVDA",
        AssetType: "Common Stock",
        Name: "NVIDIA Corporation",
        Description:
          "Nvidia Corporation is an American multinational technology company incorporated in Delaware and based in Santa Clara, California. It designs graphics processing units (GPUs) for the gaming and professional markets, as well as system on a chip units (SoCs) for the mobile computing and automotive market.",
        CIK: 1045810,
        Exchange: "NASDAQ",
        Currency: "USD",
        Country: "USA",
        Sector: "MANUFACTURING",
        Industry: "SEMICONDUCTORS & RELATED DEVICES",
        Address: "2701 SAN TOMAS EXPRESSWAY, SANTA CLARA, CA, US",
        FiscalYearEnd: "January",
        LatestQuarter: "2023-07-31",
        MarketCapitalization: 1031941390000,
        EBITDA: 12379000000,
        PERatio: 101.16,
        PEGRatio: 4.041,
        BookValue: 11.05,
        DividendPerShare: 0.16,
        DividendYield: 0.0004,
        EPS: 4.13,
        RevenuePerShareTTM: 13.21,
        ProfitMargin: 0.316,
        OperatingMarginTTM: 0.503,
        ReturnOnAssetsTTM: 0.145,
        ReturnOnEquityTTM: 0.402,
        RevenueTTM: 32681001000,
        GrossProfitTTM: 15356000000,
        DilutedEPSTTM: 4.13,
        QuarterlyEarningsGrowthYOY: 8.54,
        QuarterlyRevenueGrowthYOY: 1.015,
        AnalystTargetPrice: 594.21,
        TrailingPE: 101.16,
        ForwardPE: 39.53,
        PriceToSalesRatioTTM: 14.79,
        PriceToBookRatio: 19.59,
        EVToRevenue: 14.59,
        EVToEBITDA: 56.0,
        Beta: 1.684,
        "52WeekHigh": 502.62,
        "52WeekLow": 129.48,
        "50DayMovingAverage": 448.2,
        "200DayMovingAverage": 347.31,
        SharesOutstanding: 2470000000,
        DividendDate: "2023-09-28",
        ExDividendDate: "2023-09-06",
      },
    },
  },
  {
    id: "9cb0e66a-9937-465d-afsd-2c4c4ae2401f",
    name: "Financial Data Question Answering",
    model: "gpt-4-0613",
    type: "QA",
    prompt: "How do ORCL and GOOG's EBITDA multiples compare?",
    baselineText:
      "The 50-day moving average for Amazon.com Inc (AMZN) is 132.31 USD, while for Taiwan Semiconductor Manufacturing (TSM) it is 90.2 USD. Therefore, AMZN's 50-day moving average is higher than TSM's.",
    symgenText:
      "The EBITDA multiple for {{ data.ORCL.Name }} ({{ data.ORCL.Symbol }}) is {{ data.ORCL.EVToEBITDA }}, while the EBITDA multiple for {{ data.GOOG.Name }} ({{ data.GOOG.Symbol }}) is {{ data.GOOG.EVToEBITDA }}. This means that {{ data.ORCL.Symbol }}'s EBITDA multiple is higher than {{ data.GOOG.Symbol }}'s.",
    data: {
      GOOG: {
        Symbol: "GOOG",
        AssetType: "Common Stock",
        Name: "Alphabet Inc Class C",
        Description:
          "Alphabet Inc. is an American multinational conglomerate headquartered in Mountain View, California. It was created through a restructuring of Google on October 2, 2015, and became the parent company of Google and several former Google subsidiaries. The two co-founders of Google remained as controlling shareholders, board members, and employees at Alphabet. Alphabet is the world's fourth-largest technology company by revenue and one of the world's most valuable companies.",
        CIK: 1652044,
        Exchange: "NASDAQ",
        Currency: "USD",
        Country: "USA",
        Sector: "TECHNOLOGY",
        Industry: "SERVICES-COMPUTER PROGRAMMING, DATA PROCESSING, ETC.",
        Address: "1600 AMPHITHEATRE PARKWAY, MOUNTAIN VIEW, CA, US",
        FiscalYearEnd: "December",
        LatestQuarter: "2023-09-30",
        MarketCapitalization: 1536753926000,
        EBITDA: 93341000000,
        PERatio: 23.65,
        PEGRatio: 1.344,
        BookValue: 21.79,
        DividendPerShare: 0.0,
        DividendYield: 0.0,
        EPS: 5.22,
        RevenuePerShareTTM: 23.34,
        ProfitMargin: 0.225,
        OperatingMarginTTM: 0.278,
        ReturnOnAssetsTTM: 0.13,
        ReturnOnEquityTTM: 0.253,
        RevenueTTM: 297131999000,
        GrossProfitTTM: 156633000000,
        DilutedEPSTTM: 5.22,
        QuarterlyEarningsGrowthYOY: 0.459,
        QuarterlyRevenueGrowthYOY: 0.11,
        AnalystTargetPrice: 135.34,
        TrailingPE: 23.65,
        ForwardPE: 17.83,
        PriceToSalesRatioTTM: 4.179,
        PriceToBookRatio: 4.864,
        EVToRevenue: 4.057,
        EVToEBITDA: 12.16,
        Beta: 1.043,
        "52WeekHigh": 142.38,
        "52WeekLow": 83.45,
        "50DayMovingAverage": 135.21,
        "200DayMovingAverage": 117.13,
        SharesOutstanding: 5725000000,
        DividendDate: "None",
        ExDividendDate: "None",
      },
      ORCL: {
        Symbol: "ORCL",
        AssetType: "Common Stock",
        Name: "Oracle Corporation",
        Description:
          "Oracle is an American multinational computer technology corporation headquartered in Austin, Texas. The company was formerly headquartered in Redwood Shores, California until December 2020 when it moved its headquarters to Texas. The company sells database software and technology, cloud engineered systems, and enterprise software products, particularly its own brands of database management systems.",
        CIK: 1341439,
        Exchange: "NYSE",
        Currency: "USD",
        Country: "USA",
        Sector: "TECHNOLOGY",
        Industry: "SERVICES-PREPACKAGED SOFTWARE",
        Address: "500 ORACLE PARKWAY, MAIL STOP 5 OP 7, REDWOOD CITY, CA, US",
        FiscalYearEnd: "May",
        LatestQuarter: "2023-08-31",
        MarketCapitalization: 275033752000,
        EBITDA: 19712000000,
        PERatio: 29.79,
        PEGRatio: 1.517,
        BookValue: 0.865,
        DividendPerShare: 1.52,
        DividendYield: 0.0159,
        EPS: 3.37,
        RevenuePerShareTTM: 18.83,
        ProfitMargin: 0.184,
        OperatingMarginTTM: 0.276,
        ReturnOnAssetsTTM: 0.0671,
        ReturnOnEquityTTM: 0.73,
        RevenueTTM: 50962002000,
        GrossProfitTTM: 36390000000,
        DilutedEPSTTM: 3.37,
        QuarterlyEarningsGrowthYOY: 0.536,
        QuarterlyRevenueGrowthYOY: 0.088,
        AnalystTargetPrice: 123.85,
        TrailingPE: 29.79,
        ForwardPE: 16.39,
        PriceToSalesRatioTTM: 4.686,
        PriceToBookRatio: 47.38,
        EVToRevenue: 6.5,
        EVToEBITDA: 16.78,
        Beta: 1.023,
        "52WeekHigh": 126.95,
        "52WeekLow": 72.93,
        "50DayMovingAverage": 112.03,
        "200DayMovingAverage": 103.28,
        SharesOutstanding: 2739380000,
        DividendDate: "2023-10-26",
        ExDividendDate: "2023-10-11",
      },
    },
  },
];
