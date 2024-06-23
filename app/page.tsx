import { getBalanceSheet } from '@/app/actions/xeroApi'
import type { Xero } from '@/types/xero'
import { wait } from '@/utils/utils'
import { Fragment } from 'react'

export default async function Home() {
  await wait(2) // TODO: artificial latency to show loading status in dev
  const balanceSheetResp = await getBalanceSheet()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {balanceSheetResp.Reports.map((report, idx) => (
        <Fragment key={idx}>
          <ReportTable report={report}/>
        </Fragment>
      ))}
    </main>
  )
}

const ReportTable = ({ report }: { report: Xero.Report }) => {
  const rowIsSection = (row: Xero.RowBase): row is Xero.Section => {
    return row.RowType === 'Section'
  }

  const rowIsRow = (row: Xero.RowBase): row is Xero.Row => {
    return ['Row', 'SummaryRow'].includes(row.RowType)
  }

  const renderCell = (cell: Xero.Cell, index: number) => (
    <td key={index} className="px-6 py-4">{cell.Value}</td>
  )

  const renderHeaderCell = (cell: Xero.Cell, index: number) => (
    <th key={index} className="px-6 py-4">{cell.Value}</th>
  )

  const renderSection = (section: Xero.Section) => (
    <Fragment>
      {section.Title && (
        <tr className={''}>
          <th colSpan={100} className="pt-12 text-center">{section.Title}</th>
        </tr>
      )}
      {section.Rows.map((e, i) => renderRow(i, e))}
    </Fragment>
  )

  const renderRow = (idx: number, row: Xero.RowBase) => (
    <Fragment key={idx}>
      {rowIsSection(row) && renderSection(row)}
      {rowIsRow(row) && (
        <tr className={'border-gray-700 border-b-2'}>
          {row.Cells.map(renderCell)}
        </tr>
      )}
    </Fragment>
  )

  return (
    <div>
      {report.ReportTitles.map((title, i) => (
        <h2 key={i} className="text-xl text-center">{title}</h2>
      ))}

      <table className="mt-4 w-full text-left text-gray-400 bg-gray-800 border-solid border-collapse">
        <thead className="text-sm uppercase">
        <tr className={''}>
          {(report.Rows[0] as Xero.Row).Cells.map(renderHeaderCell)}
        </tr>
        </thead>
        <tbody>
        {report.Rows.map((e, i) => renderRow(i, e))}
        </tbody>
      </table>
    </div>
  )
}
