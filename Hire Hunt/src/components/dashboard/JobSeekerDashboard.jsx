    import {React, useState, useEffect} from 'react'
  import axios from "axios";
    import Header from "../Reusable.jsx/Header";
    import CardContainer from "../JobSeeker/CardContainer";
    import Footer from "../Reusable.jsx/Footer";
    import SearchJob from "../JobSeeker/SearchJob"; 
    const JobSeekerDashboard = () => {

      const [fetchedJobs, setfetchedJobs] = useState([])
      const [filterJobs, setfilterJobs] = useState([])
      useEffect(() => {
        const job = async () => {
          try {
            const res = await axios.get( `${import.meta.env.VITE_BaseUrl}/job/fetch`);
            setfetchedJobs(res.data);
            setfilterJobs(res.data);
          } catch (error) {
            console.log(error.message, "Error fetching jobs");
          }
        };
      
        job()
      }, [])
      

      const handleSearch = (searchTerm) => {
      const filtered = fetchedJobs.filter((job)=>{
        return(
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase())

        )
      })
      setfilterJobs(filtered);
    }


      return (
        <div className="flex flex-col  min-h-screen bg-gray-100">
          <Header />
          <SearchJob onSearch={handleSearch} />
        
         
          <div className='flex-grow'>
            <CardContainer jobs={filterJobs} />
          </div>

          <Footer />
        </div>
      );
    }

    export default JobSeekerDashboard