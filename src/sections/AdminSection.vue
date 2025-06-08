<script>
import { defineComponent, ref, computed, onMounted } from "vue";

export default defineComponent({
  name: "AdminSection",

  setup() {
    // Authentication state
    const isAuthenticated = ref(false);
    const loginForm = ref({
      email: "",
      password: ""
    });
    const loginError = ref(null);
    
    // Data loading state
    const submissions = ref([]);
    const isLoading = ref(false);
    const loadError = ref(null);
    
    // UI state
    const selectedSubmission = ref(null);
    const showDetailsModal = ref(false);
    const searchTerm = ref("");
    
    // Login function
    const login = () => {
      // Simple authentication check
      if (loginForm.value.email === "admin@gmail.com" && loginForm.value.password === "default_password") {
        isAuthenticated.value = true;
        loginError.value = null;
        fetchSubmissions();
      } else {
        loginError.value = "Invalid credentials. Please try again.";
      }
    };
    
    // Logout function
    const logout = () => {
      isAuthenticated.value = false;
      loginForm.value = { email: "", password: "" };
    };
    
    // Fetch all submissions from API
    const fetchSubmissions = async () => {
      isLoading.value = true;
      loadError.value = null;
      
      try {
        const response = await fetch('https://ableejiofor.com/apis/v1/');
        const result = await response.json();
        
        if (result.data && Array.isArray(result.data)) {
          // Parse the body JSON for each submission
          submissions.value = result.data.map(item => {
            try {
              const parsedBody = JSON.parse(item.body);
              return {
                id: item.id,
                ...parsedBody
              };
            } catch (e) {
              return {
                id: item.id,
                body: item.body,
                parseError: true
              };
            }
          });
        } else {
          loadError.value = "Invalid data format received from API";
        }
      } catch (error) {
        loadError.value = "Failed to load submissions. Please try again.";
        console.error("Error fetching submissions:", error);
      } finally {
        isLoading.value = false;
      }
    };
    
    // View entry details
    const viewDetails = (submission) => {
      selectedSubmission.value = submission;
      showDetailsModal.value = true;
    };
    
    // Close details modal
    const closeDetails = () => {
      showDetailsModal.value = false;
      selectedSubmission.value = null;
    };
    
    // Filter submissions based on search term
    const filteredSubmissions = computed(() => {
      if (!searchTerm.value) return submissions.value;
      
      const term = searchTerm.value.toLowerCase();
      return submissions.value.filter(submission => {
        return (
          (submission.fullName && submission.fullName.toLowerCase().includes(term)) ||
          (submission.email && submission.email.toLowerCase().includes(term)) ||
          (submission.category && submission.category.toLowerCase().includes(term))
        );
      });
    });
    
    // Download CSV function
    const downloadCSV = () => {
      if (!submissions.value.length) return;
      
      // Get all possible headers from all submissions
      const allKeys = new Set();
      submissions.value.forEach(submission => {
        Object.keys(submission).forEach(key => allKeys.add(key));
      });
      
      // Remove any internal fields we don't want in the export
      allKeys.delete('parseError');
      
      const headers = Array.from(allKeys);
      
      // Create CSV content
      let csvContent = headers.join(',') + '\n';
      
      submissions.value.forEach(submission => {
        const row = headers.map(header => {
          let value = submission[header] || '';
          
          // Handle arrays and special values
          if (Array.isArray(value)) {
            value = `"${value.join(', ')}"`;
          } else if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
            // Escape quotes and wrap in quotes if contains comma or newline
            value = `"${value.replace(/"/g, '""')}"`;
          }
          
          return value;
        });
        
        csvContent += row.join(',') + '\n';
      });
      
      // Create and trigger download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `marketplace-submissions-${new Date().toISOString().slice(0,10)}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    
    return {
      isAuthenticated,
      loginForm,
      loginError,
      submissions,
      isLoading,
      loadError,
      selectedSubmission,
      showDetailsModal,
      searchTerm,
      filteredSubmissions,
      login,
      logout,
      viewDetails,
      closeDetails,
      downloadCSV
    };
  }
});
</script>

<template>
  <div class="admin-section">
    <!-- Login Form -->
    <div v-if="!isAuthenticated" class="login-container">
      <h2>Admin Login</h2>
      <form @submit.prevent="login" class="login-form">
        <div class="alert error" v-if="loginError">{{ loginError }}</div>
        
        <div class="form-group">
          <label for="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            v-model="loginForm.email" 
            required 
            placeholder="Enter admin email"
          />
        </div>
        
        <div class="form-group">
          <label for="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            v-model="loginForm.password" 
            required 
            placeholder="Enter password"
          />
        </div>
        
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
    
    <!-- Admin Dashboard -->
    <div v-else class="admin-dashboard">
      <div class="dashboard-header">
        <h1>Marketplace Conference Admin</h1>
        <div class="admin-controls">
          <button @click="downloadCSV" class="btn btn-success" :disabled="!submissions.length">
            <i class="fas fa-download"></i> Download CSV
          </button>
          <button @click="logout" class="btn btn-outline">Logout</button>
        </div>
      </div>
      
      <!-- Loading and Error States -->
      <div v-if="isLoading" class="loading">Loading submissions...</div>
      <div v-else-if="loadError" class="alert error">{{ loadError }}</div>
      
      <!-- Submissions Table -->
      <div v-else class="submissions-container">
        <div class="table-controls">
          <input 
            type="text" 
            v-model="searchTerm" 
            placeholder="Search by name, email or category..." 
            class="search-input"
          />
          <span class="results-count">{{ filteredSubmissions.length }} results</span>
        </div>
        
        <table class="submissions-table" v-if="filteredSubmissions.length">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Category</th>
              <th>Country</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="submission in filteredSubmissions" :key="submission.id">
              <td>{{ submission.id }}</td>
              <td>{{ submission.fullName }}</td>
              <td>{{ submission.email }}</td>
              <td>{{ submission.phoneNumber }}</td>
              <td>{{ submission.category }}</td>
              <td>{{ submission.countryOfResidence }}</td>
              <td>{{ submission.date }}</td>
              <td>
                <button @click="viewDetails(submission)" class="btn btn-small">
                  View Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div v-else class="no-results">No submissions found</div>
      </div>
      
      <!-- Details Modal -->
      <div v-if="showDetailsModal" class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h3>Submission Details</h3>
            <button @click="closeDetails" class="close-btn">&times;</button>
          </div>
          
          <div class="modal-body" v-if="selectedSubmission">
            <div class="detail-section">
              <h4>Personal Information</h4>
              <p><strong>Full Name:</strong> {{ selectedSubmission.fullName }}</p>
              <p><strong>Email:</strong> {{ selectedSubmission.email }}</p>
              <p><strong>Phone:</strong> {{ selectedSubmission.phoneNumber }}</p>
              <p><strong>Gender:</strong> {{ selectedSubmission.gender }}</p>
              <p><strong>Age Group:</strong> {{ selectedSubmission.ageGroup }}</p>
              <p><strong>Country:</strong> {{ selectedSubmission.countryOfResidence }}</p>
              <p><strong>State:</strong> {{ selectedSubmission.stateOfResidence }}</p>
            </div>
            
            <div class="detail-section">
              <h4>Application Details</h4>
              <p><strong>Category:</strong> {{ selectedSubmission.category }}</p>
              
              <!-- Volunteer-specific details -->
              <template v-if="selectedSubmission.category === 'Volunteer'">
                <p><strong>Preferred Areas:</strong> {{ Array.isArray(selectedSubmission.preferredAreas) ? selectedSubmission.preferredAreas.join(', ') : selectedSubmission.preferredAreas }}</p>
                <p><strong>Has Volunteered Before:</strong> {{ selectedSubmission.hasVolunteeredBefore ? 'Yes' : 'No' }}</p>
                <p v-if="selectedSubmission.hasVolunteeredBefore"><strong>Previous Experience:</strong> {{ selectedSubmission.previousExperience }}</p>
                <p><strong>Reason for Volunteering:</strong> {{ selectedSubmission.volunteeringReason }}</p>
              </template>
              
              <!-- National Virtual Delegate details -->
              <template v-if="selectedSubmission.category === 'National Virtual Delegate'">
                <p><strong>State Representing:</strong> {{ selectedSubmission.stateRepresenting }}</p>
                <p><strong>Preferred Platforms:</strong> {{ Array.isArray(selectedSubmission.preferredPlatforms) ? selectedSubmission.preferredPlatforms.join(', ') : selectedSubmission.preferredPlatforms }}</p>
                <p><strong>Representation Reason:</strong> {{ selectedSubmission.representationReason }}</p>
              </template>
              
              <!-- International Delegate details -->
              <template v-if="selectedSubmission.category === 'International Delegate'">
                <p><strong>Country Representing:</strong> {{ selectedSubmission.countryRepresenting }}</p>
                <p><strong>Affiliated with Organization:</strong> {{ selectedSubmission.isAffiliated ? 'Yes' : 'No' }}</p>
                <p v-if="selectedSubmission.isAffiliated"><strong>Organization:</strong> {{ selectedSubmission.organizationName }}</p>
                <p><strong>Value Statement:</strong> {{ selectedSubmission.delegateValue }}</p>
              </template>
            </div>
            
            <div class="detail-section">
              <h4>Declaration</h4>
              <p><strong>Digital Signature:</strong> {{ selectedSubmission.signature }}</p>
              <p><strong>Date:</strong> {{ selectedSubmission.date }}</p>
            </div>
          </div>
          
          <div class="modal-footer">
            <button @click="closeDetails" class="btn btn-primary">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Login Styles */
.login-container {
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Dashboard Styles */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.admin-controls {
  display: flex;
  gap: 1rem;
}

/* Table Styles */
.table-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.search-input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
}

.submissions-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}

.submissions-table th, 
.submissions-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #eaeaea;
}

.submissions-table th {
  background-color: #f5f5f5;
  font-weight: 600;
}

.submissions-table tr:hover {
  background-color: #f9f9f9;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eaeaea;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: flex-end;
}

.detail-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eaeaea;
}

.detail-section:last-child {
  border-bottom: none;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

/* Button Styles */
.btn {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.btn-small {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-success {
  background-color: #2ecc71;
  color: white;
}

.btn-success:hover {
  background-color: #27ae60;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid #3498db;
  color: #3498db;
}

.btn-outline:hover {
  background-color: #f0f8ff;
}

/* Utility Classes */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.alert {
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.error {
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.no-results {
  text-align: center;
  padding: 2rem;
  color: #666;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.results-count {
  color: #666;
}
</style>
