import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

export async function GET() {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://betadirectory-bkd.api-setu.in/directory/api/search/v1/entity?q={"facetFilters":[[]],"facets":[],"maxValuesPerFacet":20,"page":0,"query":"","tagFilters":""}',
    headers: {
      accept: 'application/json',
      ts: '1777239437',
      Authorization: 'Bearer dae69dec92797776eac5e9b281e386b3af1cd5f630398cc32e93735c21ddd443',
    },
  };

  try {
    const response = await axios.request(config);

    // Extracting `hits`
    const results = response.data.results || [];
    const hits = results[0]?.hits || [];

    return NextResponse.json({ hits });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          error: `Error: ${error.response?.status} - ${
            error.response?.data?.error || error.response?.data?.message || 'Unknown error'
          }`,
        },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      {
        error: 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
