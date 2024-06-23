export namespace Xero {
  interface Attribute {
    Value: string
    Id: string
  }

  interface Cell {
    Value: string
    Attributes?: Attribute[]
  }

  interface RowBase {
    RowType: string
  }

  interface Row extends RowBase{
    RowType: 'Header' | 'Row' | 'SummaryRow'
    Cells: Cell[]
  }

  interface Section extends RowBase {
    RowType: 'Section'
    Title: string
    Rows: Row[]
  }

  interface Report {
    ReportID: string
    ReportName: string
    ReportType: string
    ReportTitles: string[]
    ReportDate: string
    UpdatedDateUTC: string
    Fields: any[]
    Rows: RowBase[]
  }

  interface BalanceSheetResponse {
    Status: string
    Reports: Report[]
  }
}
