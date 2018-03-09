import { DBCore, KeyRange, Key, Transaction, QueryBase } from '../L1-dbcore/dbcore';
import { SubQueryCore } from '../L2.9-sub-query/sub-query-core';
import { KeyRangePagingCore, PagableKeyRangeQuery, QueryRangeResponse, KeyRangePageToken } from '../L3-keyrange-paging/keyrange-paging-engine';


export interface MultiRangeQuery extends {
  trans: Transaction;
  table: string;
  index: string;
  limit?: number;
  want?: "primaryKeys" | "keys" | "values" | "keyPairs";
  unique?: boolean;
  reverse?: boolean;
  ranges: KeyRange[];
  wantPageToken?: boolean;
  pageToken?: KeyRangePageToken;
}

export interface MultiRangeBloomQuery {
  trans: Transaction;
  table: string;
  index: string;
  limit?: number;
  want?: "primaryKeys" | "keys" | "values" | "keyPairs";
  unique?: boolean;
  reverse?: boolean;
  ranges: KeyRange[];
  wantPageToken?: boolean;
  pageToken?: KeyRangePageToken;  
}

export interface MultiRangeResponse extends QueryRangeResponse {
}

export interface MultiRangeCore extends KeyRangePagingCore {
  queryRanges(req: MultiRangeQuery): Promise<MultiRangeResponse>
}

const KEY_COUNT_LIMIT = 10000;

export function MultiRangeCore (next: KeyRangePagingCore) : MultiRangeCore {
  return {
    ...next,
    queryRanges(query) : Promise<MultiRangeResponse> {
      const {limit, ranges} = query;
      if (ranges.length === 1)
        return next.queryRange({...query, range: ranges[0]} as PagableKeyRangeQuery);
      
      /*if (want == 'bloom') {
        return Promise.all(ranges.map(range => bloom(next, ({...req, range, limit: KEY_COUNT_LIMIT} as KeyRangeQuery))))
          .then(() => ({}));
      }*/
      throw new Error();
    }
  };

}