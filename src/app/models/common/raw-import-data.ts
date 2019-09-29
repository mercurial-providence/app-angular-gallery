/* Info!?
*
*
*/

export class RawImportData<T> {
    records: Array<T>;
    pagination: {
      count: string;
      page: string;
      limit: string;
      totalpages: string;
    }
}

