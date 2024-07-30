import * as React from "react";
import "./jobBoard.css";

interface IJob {
  "by": string,
  "id": number,
  "score": number,
  "time":number
  "title":string,
  "type":string,
  "url": string,
}

interface IIdx {
  start: number;
  end: number;
}

export const JobBoard = () => {
  const [jobIds, setJobIds] = React.useState<number[]>([]);
  const [jobDetails, setJobDetails] = React.useState<IJob[]>([])
  const [startEndIdx, setStartEndIdx] = React.useState<IIdx>({start: 0, end: 6});

  const getListJobIds = React.useCallback(async () => {
    const response = await fetch("https://hacker-news.firebaseio.com/v0/jobstories.json", {
      "method": "get",
      "Content-Type": "application/json"
    });

    const jobIds = await response.json();
    setJobIds(jobIds)
  },[]);


  const getJobDetails = React.useCallback(async () => {
    if(jobIds.length > 0) {
      const jds =[]
      const allJObs = jobIds?.slice(startEndIdx?.start, startEndIdx?.end);
      const jobDs =  allJObs?.map(async (job) => {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${job}.json`, {
          "method": "get",
          "Content-Type": "application/json"
        });
        const jd = await response.json();
      });

      const resolvePr0mise = await Promise.all(jobDs);


      setJobDetails((prevState) => ([...prevState, ...resolvePr0mise]));
    }
  },[startEndIdx, jobIds]);

  const addMore = () => setStartEndIdx(
    (prevState) => ({
      start: prevState?.end,
      end:  prevState?.end + 6
    }));

  React.useEffect(() => getListJobIds(), [getListJobIds]);

  React.useEffect(() => getJobDetails(),[startEndIdx, jobIds]);

  console.log("jobDetails", jobDetails);

  return (
    <>
      <div className="job-details">
        {jobDetails?.map((job) => (
          <>
            { job && (
              <div className="card" key={job?.id}>
                <div>
                  { !!job?.url ? <a href={job?.url} target="_blank">{job?.title}</a> : <span>{job?.title}</span> }
                  <div>
                    <span>By {job?.by}.</span>
                    {job?.time && <span>{job?.time}</span>}
                  </div>
                </div>
              </div>
            )}
          </>

        ))}
        <button className="button" onClick={addMore}>Add more jobs</button>
      </div>
    </>
  )
}
