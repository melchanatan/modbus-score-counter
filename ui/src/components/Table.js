import React from 'react'

const Table = () => {
  return (
    <table className='w-full'>
        <tr className='bg-white text-slate-500 '>
            <th>Name</th>
            <th>Score</th>
        </tr>
        <tr className='[&>*]:border-2 border-slate-200'>
            <td>mel</td>
            <td>yes</td>
        </tr>

    </table>
  )
}

export default Table