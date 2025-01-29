import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteContractTemplate, getAllContractTemplates } from '../../../redux/actions/contractTemplate'
import { Link } from 'react-router-dom'
import moment from 'moment-timezone'
import Loading from '../../Loading'
import { useAlert } from '../../../hooks/userAlert'

const ContractTemplates = () => {
  const dispatch = useDispatch()


  const alert = useAlert()
  const { templates, error, loading, message } = useSelector(state => state.contractTemplate)

  useEffect(() => {
    dispatch(getAllContractTemplates())
  }, [dispatch, error, message])

  useEffect(() => {
    alert(message, error, '/operations/templates')
  }, [error, message])

  return (
    loading ? <Loading /> : <section className='w-full'>
      <table>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Program</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {
            templates && templates.length > 0 && templates.map((t, index) => <tr key={index}>
              <td>{index + 1}</td>
              <td>{t.program.country}</td>
              <td>{t.title}</td>
              <td>
                <div className='actions'>
                  <Link to={`/operations/template/${t._id}/update`}>Update</Link>
                  <button onClick={() => dispatch(deleteContractTemplate(t._id, moment.tz("Asia/Karachi").format()))}>Delete</button>
                </div>
              </td>
            </tr>
            )
          }
        </tbody>
      </table>
    </section>
  )
}

export default ContractTemplates
