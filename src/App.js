import { useState, useEffect } from "react";
import "./App.css";
import { ContactList } from "./components/ContactList";
import { SearchFilter } from "./components/SearchFilter";
import {Spinner} from "./components/Spinner";
import { Title } from "./components/Title";
import {fetchUsers} from "./helper/apiCall"


// const apiURL = "https://randomuser.me/api/?"
const App = () => {
	const [user, setUser] = useState([]);
	const [contacts, setContacts] = useState([]);
	const [loading, setLoading] = useState([]);

	useEffect(() => {
		setLoading(true);
		fetchUsers().then(data => {
			setContacts(data.results);
			setUser(data.results);
			setLoading(false);
		});
	}, []);

	const handleOnGenderChange = (e) => {
		const {value} = e.target;
		setLoading(true);
		const params = `results=20&gender=${value}`;
		fetchUsers(params).then(data => {
			setContacts(data.results);
			setUser(data.results);
			setLoading(false);
		});
	};

	const handleOnSearch = e => {
		const { value } = e.target;

		// filter

		const filterArgs = user.filter((user)=>{
			const userName = (user.name.first + " " + user.name.last).toLowerCase();
		if (userName.includes(value.toLowerCase())) {
			return true;
		}
		});

		setContacts(filterArgs);
	};

	return (
		<div className="wrapper">
			<div className="container">
				{/* title section */}
				<Title />

				{/* Search and filter section */}
				<SearchFilter handleOnGenderChange= {handleOnGenderChange} handleOnSearch= {handleOnSearch}/>
				<hr />
				{/* user count */}
				<div className="row">
					<div className="col">{contacts.length} users found</div>
				</div>

				{loading && <Spinner/>}
				{/* contact list cards */}
				<ContactList users= {contacts}/>
			</div>
		</div>
	);
};

export default App;
