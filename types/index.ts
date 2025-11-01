export interface QueryRequest {
  query: string;
}

export interface QueryResponse {
  query: string;
  query_type: string;
  analysis: {
    summary: string;
    key_findings: string[];
    viz_type: string;
    x_field: string;
    y_field: string;
  };
  vega_spec: object;
  data_count: number;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  vegaSpec?: object;
  analysis?: QueryResponse['analysis'];
}

