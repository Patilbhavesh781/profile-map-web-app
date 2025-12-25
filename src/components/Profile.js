import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const initialProfiles = [
  { id: 1, name: "John Doe", age: 30, job: "Software Engineer", salary: "$80,000",location:"pune", hobbies: "Reading, Traveling", photo: "/imag1.jpeg", description: "Experienced software developer", lat: 18.5248706, lng: 73.6981531 },
  { id: 2, name: "Jane Smith", age: 28, job: "Data Scientist", salary: "$90,000",location:"chennai", hobbies: "Hiking, Cooking", photo: "/image2.jpeg", description: "Data enthusiast", lat: 13.0478078, lng: 80.0438585 },
  { id: 3, name: "Alice Brown", age: 26, job: "UX Designer", salary: "$75,000",location:"kolkata", hobbies: "Sketching, Gaming", photo: "/image3.jpeg", description: "Creative UI/UX designer", lat: 22.5354441, lng: 88.0354893 },
  { id: 4, name: "Michael Johnson", age: 35, job: "Product Manager", salary: "$100,000",location:"hydrabad", hobbies: "Cycling, Reading", photo: "/image4.jpeg", description: "Strategic product planner", lat: 17.4126086, lng: 78.2432311 },
  { id: 5, name: "Emily Davis", age: 29, job: "AI Researcher", salary: "$95,000",location:"mumbai", hobbies: "Chess, Music", photo: "/image5.jpeg", description: "Passionate AI scientist", lat: 19.0730413, lng: 72.8695123 }
];


function ProfileList({ profiles, setProfiles }) {
  const [search, setSearch] = useState("");
  const filteredProfiles = profiles.filter((profile) => profile.name.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-primary">Profile Viewer</h1>
      <div className="mb-3 d-flex justify-content-center">
        <input 
          type="text" 
          className="form-control w-50 me-2" 
          placeholder="Search profiles..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
        <button className="btn btn-outline-primary" onClick={() => setSearch("")}>Clear</button>
      </div>
      <Link to="/add" className="btn btn-success mb-3">Add Profile</Link>
      <div className="row">
        {filteredProfiles.map((profile) => (
          <div className="col-md-4" key={profile.id}>
            <div className="card shadow-lg border-0 mb-4">
              <img src={profile.photo} className="card-img-top rounded-top" alt={profile.name} style={{ height: "250px", objectFit: "cover" }} />
              <div className="card-body text-center">
                <h5 className="card-title fw-bold text-dark">{profile.name}</h5>
                <h5 className="card-title fw-bold text-dark">{profile.location}</h5>
                <p className="card-text text-muted">{profile.description}</p>
                <Link to={`/profile/${profile.id}`} className="btn btn-primary btn-sm">View Details</Link>
                <Link to={`/edit/${profile.id}`} className="btn btn-warning btn-sm ms-2">Edit</Link>
                <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(profile.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
        {filteredProfiles.length === 0 && <p className="text-center text-danger">No profiles found</p>}
      </div>
    </div>
  );
}


function ProfileDetails({ profiles }) {
  let { id } = useParams();
  const profile = profiles.find((p) => p.id === parseInt(id));
  if (!profile) return <h2 className="text-center mt-4 text-danger">Profile not found</h2>;

  return (
    <div className="container mt-4">
      <div className="card shadow-lg border-0 p-4">
        <h2 className="text-center fw-bold text-primary">{profile.name}</h2>
        <img src={profile.photo} alt={profile.name} className="img-fluid mx-auto d-block rounded-circle" style={{ width: "200px", height: "200px", objectFit: "cover" }} />
        <div className="text-center mt-3">
          <p><strong>Age:</strong> {profile.age}</p>
          <p><strong>Job:</strong> {profile.job}</p>
          <p><strong>Salary:</strong> {profile.salary}</p>
          <p><strong>Location:</strong> {profile.location}</p>
          <p><strong>Hobbies:</strong> {profile.hobbies}</p>
          <p><strong>description:</strong> {profile.description}</p>
        </div>
        <h3 className="text-center mt-4">Location</h3>
        <iframe
          width="100%"
          height="400"
          title="Profile Location Map"
          src={`https://maps.google.com/maps?q=${profile.lat},${profile.lng}&hl=en&z=14&output=embed`}
          allowFullScreen
          loading="lazy"
        ></iframe>
        <div className="text-center mt-3">
          <Link to="/" className="btn btn-secondary">Back to Profiles</Link>
        </div>
      </div>
    </div>
  );
}


function AddEditProfile({ profiles, setProfiles }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const profileToEdit = isEdit ? profiles.find(p => p.id === parseInt(id)) : {};
  const [form, setForm] = useState({ 
    name: profileToEdit?.name || "", 
    age: profileToEdit?.age || "", 
    job: profileToEdit?.job || "", 
    salary: profileToEdit?.salary || "", 
    hobbies: profileToEdit?.hobbies || "", 
    photo: profileToEdit?.photo || "", 
    description: profileToEdit?.description || "", 
    location: profileToEdit?.location || "" 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      setProfiles(profiles.map(profile => profile.id === parseInt(id) ? { ...profile, ...form } : profile));
    } else {
      setProfiles([...profiles, { id: profiles.length + 1, ...form }]);
    }
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-success">{isEdit ? "Edit Profile" : "Add Profile"}</h2>
      <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
        <input type="text" className="form-control mb-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="number" className="form-control mb-2" placeholder="Age" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} required />
        <input type="text" className="form-control mb-2" placeholder="Job" value={form.job} onChange={(e) => setForm({ ...form, job: e.target.value })} required />
        <input type="text" className="form-control mb-2" placeholder="Salary" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} required />
        <input type="text" className="form-control mb-2" placeholder="Hobbies" value={form.hobbies} onChange={(e) => setForm({ ...form, hobbies: e.target.value })} required />
        <input type="text" className="form-control mb-2" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
        <input type="text" className="form-control mb-2" placeholder="Photo URL" value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} required />
        <textarea className="form-control mb-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <button type="submit" className="btn btn-success w-100">{isEdit ? "Save Changes" : "Add Profile"}</button>
      </form>
    </div>
  );
}


function App() {
  const [profiles, setProfiles] = useState(initialProfiles);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProfileList profiles={profiles} setProfiles={setProfiles} />} />
        <Route path="/profile/:id" element={<ProfileDetails profiles={profiles} />} />
        <Route path="/add" element={<AddEditProfile profiles={profiles} setProfiles={setProfiles} />} />
        <Route path="/edit/:id" element={<AddEditProfile profiles={profiles} setProfiles={setProfiles} />} />
      </Routes>
    </Router>
  );
}

export default App;
