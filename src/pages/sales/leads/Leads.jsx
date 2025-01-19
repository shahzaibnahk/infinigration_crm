import SalesFilter from '../../../components/SalesFilter';
import BulkReturn from '../../../components/BulkReturn';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { bulkReturnLeads, getSalesAssignedLeads } from '../../../redux/actions/lead';
import moment from 'moment-timezone';
import { Link, useParams } from 'react-router-dom';
import { useAlert } from '../../../hooks/userAlert';
import Loading from '../../Loading';

const Leads = () => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const alert = useAlert("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

  const [date, setDate] = useState(moment.tz("Asia/Karachi").format("YYYY-MM-DD"));
  const [tag, setTag] = useState({ value: "all", label: "All" });
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const { assignedLeads, loading, error, message } = useSelector(state => state.lead);

  useEffect(() => {
    if (id === "assigned") {
      dispatch(getSalesAssignedLeads(user._id, date, "fresh"));
    }

    if (id === "shuffled") {
      dispatch(getSalesAssignedLeads(user._id, date, "shuffled"));
    }
  }, [user._id, id, date]);

  // Filter leads based on the selected filters
  useEffect(() => {
    if (assignedLeads) {
      const filtered = assignedLeads.filter(lead => {
        const matchesTag = tag.value === "all" || lead.sales.status === tag.value;
        const matchesPhone = phone === "" || lead.phone.includes(phone);
        const matchesName = name === "" || lead.name.toLowerCase().includes(name.toLowerCase());
        return matchesTag && matchesPhone && matchesName;
      });
      setFilteredLeads(filtered);
    }
  }, [assignedLeads, tag, phone, name]);

  // Handle select/deselect all leads
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedLeads(filteredLeads.map((lead) => lead._id));
    } else {
      setSelectedLeads([]);
    }
  };

  // Handle individual lead selection
  const handleSelectLead = (e, leadId) => {
    if (e.target.checked) {
      setSelectedLeads((prev) => [...prev, leadId]);
    } else {
      setSelectedLeads((prev) => prev.filter((id) => id !== leadId));
    }
  };

  const returnLeadsHandler = (e) => {
    e.preventDefault();
    dispatch(bulkReturnLeads(selectedLeads, reason.value, description, moment.tz("Asia/Karachi").format()));
  };

  useEffect(() => {
    alert(message, error, "/sales/leads");
  }, [error, message]);

  return (
    loading || !assignedLeads ? <Loading /> : <section className='w-full'>
      <SalesFilter
        tag={tag}
        setTag={setTag}
        date={date}
        setDate={setDate}
        phoneNumber={phone}
        setPhoneNumber={setPhone}
        name={name}
        setName={setName}
      />
      <BulkReturn
        reason={reason}
        setReason={setReason}
        description={description}
        setDescription={setDescription}
        submitHandler={returnLeadsHandler}
      />

      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={filteredLeads.length > 0 && selectedLeads.length === filteredLeads.length}
              />
            </th>
            <th>Date</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Program</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredLeads && filteredLeads.length > 0 ? filteredLeads.map((l, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedLeads.includes(l._id)}
                  onChange={(e) => handleSelectLead(e, l._id)}
                />
              </td>
              <td>{l.leadAssignedAt.split("T")[0]}</td>
              <td>{l.name}</td>
              <td>{l.phone}</td>
              <td>{l.program || "N/A"}</td>
              <td>{l.sales.status}</td>
              <td>
                <div className='actions'>
                  <Link to={`/sales/lead/${l._id}/activities`}>Activities</Link>
                  <Link to={`/sales/lead/${l._id}/update-status`}>Update Status</Link>
                  <Link to={`/sales/lead/${l._id}/remarks/add`}>Add Remarks</Link>
                  <Link to={`https://wa.me/${l.phone}`} target='_blank'>Whatsapp</Link>
                </div>
              </td>
            </tr>
          )) : <tr><td colSpan="7">No leads found.</td></tr>}
        </tbody>
      </table>
    </section>
  );
};

export default Leads;
