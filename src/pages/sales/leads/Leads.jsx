import React from 'react'
import Select from 'react-select'
import { styles } from '../../../select/styles'
import SalesFilter from '../../../components/SalesFilter'
import BulkReturn from '../../../components/BulkReturn'

const Leads = () => {
  return (
    <section className='w-full'>
      <SalesFilter />
      <BulkReturn/>
    </section>
  )
}

export default Leads
