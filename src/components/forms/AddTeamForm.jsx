import { useState } from "react";
import { Send, User, Mail, Phone, UserCheck, Users, Trophy } from "lucide-react";
import styles from "./AddTeamForm.module.css";  
import { useParams } from "react-router";
import axios from "axios";

const AddTeamForm = () => {
  const {id}=useParams();
  const beUrl="https://aavishkaar2025-be.onrender.com/aavishkaar/teams/register";
  const [formData, setFormData] = useState({
    teamName: "",
    leader: {
      name: "",
      email: "",
      contactNumber: "",
      usn: "",
    },
    members: [
      {
        name: "",
        usn: "",
      },
    ],
    event:id,
  });

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(beUrl, formData);
    } catch (e) {
      if (e.response) {
        console.error("ServerError:", e.response.data);
      } else {
        console.error("RequestError:", e.message);
      }
    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prevState) => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleMemberChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMembers = [...formData.members];
    updatedMembers[index] = { ...updatedMembers[index], [name]: value };

    setFormData((prevState) => ({
      ...prevState,
      members: updatedMembers,
    }));
  };

  const addMember = () => {
    if (formData.members.length < 3) {
      setFormData((prevState) => ({
        ...prevState,
        members: [...prevState.members, { name: "", usn: "" }],
      }));
    }
  };

  const removeMember = (index) => {
    const updatedMembers = formData.members.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      members: updatedMembers,
    }));
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-pink-500" />
          <h1 className={`font-orbitron text-4xl md:text-5xl font-bold mb-4 ${styles.textGradient}`}>
            Team Registration
          </h1>
          <p className="text-gray-400 text-lg">Create your dream team and start your journey</p>
        </div>

        <div className="form-section space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Team Name */}
            <div>
              <label htmlFor="teamName" className={styles.formLabel}>
                Team Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <Users className={styles.inputIcon} />
                </div>
                <input
                  type="text"
                  id="teamName"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  className={`${styles.inputField} ${styles.inputPadding}`}  // Updated
                  placeholder="Enter team name"
                  required
                />
              </div>
            </div>

            
            <div className="space-y-6">
              <div className="flex items-center">
                <Trophy className="w-5 h-5 text-pink-500 mr-2" />
                <h2 className="text-xl font-semibold text-gradient">Team Leader</h2>
              </div>
              <div className="form-section space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="leader.name" className={styles.formLabel}>Name</label>
                    <div className="relative ">
                      <div className="absolute inset-y-0 left-0  flex items-center">
                        <User className={styles.inputIcon} />
                      </div>
                      <input
                        type="text"
                        id="leader.name"
                        name="leader.name"
                        value={formData.leader.name}
                        onChange={handleChange}
                        className={styles.inputField + " pl-12"}
                        placeholder="Leader's name"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="leader.email" className={styles.formLabel}>Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center">
                        <Mail className={styles.inputIcon} />
                      </div>
                      <input
                        type="email"
                        id="leader.email"
                        name="leader.email"
                        value={formData.leader.email}
                        onChange={handleChange}
                        className={styles.inputField + " pl-12"}
                        placeholder="Leader's email"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="leader.contactNumber" className={styles.formLabel}>Contact Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center">
                        <Phone className={styles.inputIcon} />
                      </div>
                      <input
                        type="tel"
                        id="leader.contactNumber"
                        name="leader.contactNumber"
                        value={formData.leader.contactNumber}
                        onChange={handleChange}
                        className={styles.inputField + " pl-12"}
                        placeholder="Contact number"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="leader.usn" className={styles.formLabel}>USN</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center">
                        <UserCheck className={styles.inputIcon} />
                      </div>
                      <input
                        type="text"
                        id="leader.usn"
                        name="leader.usn"
                        value={formData.leader.usn}
                        onChange={handleChange}
                        className={styles.inputField + " pl-12"}
                        placeholder="Leader's USN"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-pink-500 mr-2" />
                  <h2 className="text-xl font-semibold text-gradient">Team Members</h2>
                </div>
                <button
                  type="button"
                  onClick={addMember}
                  className={`${styles.btnSuccess} ${formData.members.length >= 4 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={formData.members.length >= 4}
                >
                  Add Member
                </button>
              </div>

              <div className="space-y-6">
                {formData.members.map((member, index) => (
                  <div key={index} className="form-section">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-300">
                        Member {index + 1}
                      </h3>
                      {formData.members.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMember(index)}
                          className={styles.btnDanger}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor={`member-${index}-name`} className={`${styles.formLabel} mb-2`}>Name</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center">
                            <User className={styles.inputIcon} />
                          </div>
                          <input
                            type="text"
                            id={`member-${index}-name`}
                            name="name"
                            value={member.name}
                            onChange={(e) => handleMemberChange(index, e)}
                            className={styles.inputField + " pl-12"}
                            placeholder="Member's name"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor={`member-${index}-usn`} className={`${styles.formLabel} mb-2`}>USN</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center">
                            <UserCheck className={styles.inputIcon} />
                          </div>
                          <input
                            type="text"
                            id={`member-${index}-usn`}
                            name="usn"
                            value={member.usn}
                            onChange={(e) => handleMemberChange(index, e)}
                            className={styles.inputField + " pl-12"}
                            placeholder="Member's USN"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className={styles.btnPrimary}>
              <span>Submit Registration</span>
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTeamForm;
