import "./App.css";
import "./roboto.css";
import "line-awesome/dist/line-awesome/css/line-awesome.min.css";
// React Hooks
import { useState, useEffect } from "react";

function App() {

	// Loading Data from JSON
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	// Filter Checkbox
	const [filter, setFilter] = useState([]);

	const handleTypeFilter = (e) => {
		const { checked, value } = e.currentTarget;
		setFilter(
      prev => checked
        ? [...prev, value]
        : prev.filter(val => val !== value)
    );
	}

	console.log(filter);
	// Search Query
	const [searchVal, setSearchVal] = useState('');
	// Fetched Data
	const [airports, setAirports] = useState([]);
	// Pagination Range
	const [start, setStart] = useState(0)
	const [end, setEnd] = useState(5)

	// Handling Pagination Range
	const handleStart = (e) => {
		setStart(start - 5);
		setEnd(end - 5);
		}
	const handleEnd = (e) => {
		setStart(start + 5);
		setEnd(end + 5);
		}
	// Fetching Data
	useEffect(() => {
    fetch("/data/airports.json")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setAirports(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

	if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {

		return (
			<div className="App">
				<div className="container">
					{/* Header Wrapper */}
					<div className="header-wrapper">
						<p className="heading">
							Filter <span>airports</span>
						</p>
						<i className="las la-th-large la-2x"></i>
					</div>
					{/* Filter Wrapper */}
					<div className="filter-wrapper">
						{/* Filter Type */}
						<div className="filter-type">
							<p className="filter-title">Type</p>
							<form>
								<label>
									<input name="small" id="small" value="small" type="checkbox" onClick={handleTypeFilter} />
									Small
								</label>

								<label>
									<input name="medium" id="medium" value="medium" type="checkbox" onClick={handleTypeFilter} />
									Medium
								</label>

								<label>
									<input name="large" id="large" value="large" type="checkbox" onClick={handleTypeFilter} />
									Large
								</label>

								<label>
									<input name="heliport" id="heliport" value="heliport" type="checkbox" onClick={handleTypeFilter} />
									Heliport
								</label>

								<label>
									<input name="closed" id="closed" value="closed" type="checkbox" onClick={handleTypeFilter} />
									Closed
								</label>

								<label>
									<input name="favorites" id="favorites" value="favorites" type="checkbox" onClick={handleTypeFilter} />
									In your favorites
								</label>
							</form>
						</div>
						{/* Filter  Search */}
						<div className="filter-search">
							<p className="filter-title">Filter by Search</p>
				<form>
					<input type="text" id="search" onChange={e => setSearchVal(e.target.value)} />
				</form>

						</div>
					</div>
					{/* Filter Table */}
					<div className="table-container">
						<table>
							<thead>
								<tr>
									<th>Name</th>
									<th>ICAO</th>
									<th>IATA</th>
									<th>Elev.</th>
									<th>Lat.</th>
									<th>Long.</th>
									<th>Type</th>
								</tr>
							</thead>
							<tbody>
							{airports.filter((searchedResult) => {
									if(searchVal === ""){
										return searchedResult;
									}
									else if(searchedResult.name.toLowerCase().includes(searchVal.toLowerCase())){
										return searchedResult;
									}
								}).slice(start, end).map((airport) => {
									return(
									<tr key={airport.id}>
										<td>{airport.name}</td>
										<td>{airport.icao}</td>
										<td>{airport.iata}</td>
										<td>{airport.elevation}</td>
										<td>{airport.latitude}</td>
										<td>{airport.longitude}</td>
										<td>{airport.type}</td>
									</tr>
									)
								})}
							</tbody>
						</table>
					</div>
					{/* Filter Footer */}
					<div className="filter-footer">
						{ start == 0 ? <i></i> : <i className="la la-arrow-left la-3x" onClick={handleStart}></i>}
						<div className="pagination">
							Showing &nbsp;<span>{start + 1}</span>&nbsp;-&nbsp;<span>{end}</span>&nbsp;of &nbsp;<span>{airports.length + 1}</span>&nbsp;results
						</div>
						<i className="la la-arrow-right la-3x" onClick={handleEnd}></i>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
