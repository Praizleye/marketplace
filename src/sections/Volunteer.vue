<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Volunteer",

  setup() {
    const formData = ref({
      // Section A: Personal Information
      fullName: "",
      email: "",
      phoneNumber: "",
      gender: "",
      ageGroup: "",
      countryOfResidence: "",
      stateOfResidence: "",
      
      // Section B: Application Category
      category: "Volunteer", // Default selection
      
      // Section C: Volunteer Specific Details
      preferredAreas: [],
      hasVolunteeredBefore: null,
      previousExperience: "",
      volunteeringReason: "",
      
      // Section D: Commitment Declaration
      signature: "",
      date: new Date().toISOString().substr(0, 10),
    });

    const isSubmitting = ref(false);
    const submissionResult = ref(null);
    const submissionError = ref(null);

    const whatsappLinks = {
      "National Virtual Delegate": "https://chat.whatsapp.com/EWadDbkQ0TIFKgIRJd5YOM",
      "Volunteer": "https://chat.whatsapp.com/FrtOuYfkVfL2FR2zdKFEU6",
      "International Delegate": "https://chat.whatsapp.com/LZJBnQViu5TJ2wg0B0ULIh"
    };

    const submitForm = async () => {
      isSubmitting.value = true;
      submissionResult.value = null;
      submissionError.value = null;

      try {
        // Prepare data payload in the format specified by the API
        const payload = {
          body: JSON.stringify(formData.value)
        };

        // Make API call
        const response = await fetch('https://ableejiofor.com/apis/v1/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (data.success) {
          submissionResult.value = data.success;
          // Reset form after successful submission
          // formData.value = { ...initialFormData }; // Uncomment if you want to reset the form
        } else if (data.error) {
          submissionError.value = data.error;
        }
      } catch (error) {
        submissionError.value = "An error occurred while submitting the form. Please try again.";
        console.error("Form submission error:", error);
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      formData,
      submitForm,
      isSubmitting,
      submissionResult,
      submissionError,
      whatsappLinks
    };
  },
});
</script>

<template>
  <div class="volunteer-form-container">
    <h1>Marketplace Leadership Conference Application Form</h1>
    <h3>Theme: Diplomatic Kingdom Affairs | Saturday, 21st June 2025 | 9:30 AM</h3>
    
    <!-- Success/Error Messages -->
    <div v-if="submissionResult" class="submission-success">
      <h4>Application Submitted Successfully!</h4>
      <p>Please join our WhatsApp group for {{ formData.category }}s:</p>
      <a :href="whatsappLinks[formData.category]" target="_blank" class="whatsapp-link">
        <button class="whatsapp-btn">Join WhatsApp Group</button>
      </a>
    </div>
    
    <div v-if="submissionError" class="submission-error">
      <p>Error: {{ submissionError }}</p>
    </div>
    
    <form @submit.prevent="submitForm" class="application-form" v-if="!submissionResult">
      <!-- Section A: Personal Information -->
      <div class="form-section">
        <h2>SECTION A: Personal Information</h2>
        
        <div class="form-group">
          <label for="fullName">Full Name:</label>
          <input type="text" id="fullName" v-model="formData.fullName" required>
        </div>
        
        <div class="form-group">
          <label for="email">Email Address:</label>
          <input type="email" id="email" v-model="formData.email" required>
        </div>
        
        <div class="form-group">
          <label for="phoneNumber">Phone Number (Include Country Code):</label>
          <input type="tel" id="phoneNumber" v-model="formData.phoneNumber" required>
        </div>
        
        <div class="form-group">
          <label>Gender:</label>
          <div class="radio-group">
            <label>
              <input type="radio" v-model="formData.gender" value="Male">
              Male
            </label>
            <label>
              <input type="radio" v-model="formData.gender" value="Female">
              Female
            </label>
            <label>
              <input type="radio" v-model="formData.gender" value="Prefer not to say">
              Prefer not to say
            </label>
          </div>
        </div>
        
        <div class="form-group">
          <label>Age Group:</label>
          <div class="radio-group">
            <label>
              <input type="radio" v-model="formData.ageGroup" value="Under 18">
              Under 18
            </label>
            <label>
              <input type="radio" v-model="formData.ageGroup" value="18-24">
              18-24
            </label>
            <label>
              <input type="radio" v-model="formData.ageGroup" value="25-34">
              25-34
            </label>
            <label>
              <input type="radio" v-model="formData.ageGroup" value="35-44">
              35-44
            </label>
            <label>
              <input type="radio" v-model="formData.ageGroup" value="45 and above">
              45 and above
            </label>
          </div>
        </div>
        
        <div class="form-group">
          <label for="countryOfResidence">Country of Residence:</label>
          <input type="text" id="countryOfResidence" v-model="formData.countryOfResidence" required>
        </div>
        
        <div class="form-group">
          <label for="stateOfResidence">State of Residence (if in Nigeria):</label>
          <input type="text" id="stateOfResidence" v-model="formData.stateOfResidence">
        </div>
      </div>
      
      <!-- Section B: Application Category (now with selectable options) -->
      <div class="form-section">
        <h2>SECTION B: Application Category</h2>
        <p>Select one:</p>
        <div class="radio-group">
          <label>
            <input type="radio" v-model="formData.category" value="National Virtual Delegate" :disabled="formData.countryOfResidence !== 'Nigeria' && formData.countryOfResidence !== ''">
            National Virtual Delegate (Nigerian residents only)
          </label>
          <label>
            <input type="radio" v-model="formData.category" value="Volunteer">
            Volunteer
          </label>
          <label>
            <input type="radio" v-model="formData.category" value="International Delegate" :disabled="formData.countryOfResidence === 'Nigeria'">
            International Delegate
          </label>
        </div>
        <p v-if="formData.countryOfResidence !== 'Nigeria' && formData.category === 'National Virtual Delegate'" class="validation-error">
          National Virtual Delegate is only available for Nigerian residents.
        </p>
        <p v-if="formData.countryOfResidence === 'Nigeria' && formData.category === 'International Delegate'" class="validation-error">
          Nigerian residents should select National Virtual Delegate instead of International Delegate.
        </p>
      </div>
      
      <!-- Section C: Volunteer Specific Details -->
      <div class="form-section" v-if="formData.category === 'Volunteer'">
        <h2>SECTION C: Volunteer Specific Details</h2>
        
        <div class="form-group">
          <label>Preferred Area(s) to Volunteer:</label>
          <div class="checkbox-group">
            <label>
              <input type="checkbox" v-model="formData.preferredAreas" value="Social Media/Online Engagement">
              Social Media/Online Engagement
            </label>
            <label>
              <input type="checkbox" v-model="formData.preferredAreas" value="Delegates Support & Communication">
              Delegates Support & Communication
            </label>
            <label>
              <input type="checkbox" v-model="formData.preferredAreas" value="Technical Support (Zoom/Audio/Video)">
              Technical Support (Zoom/Audio/Video)
            </label>
            <label>
              <input type="checkbox" v-model="formData.preferredAreas" value="Content Writing & Documentation">
              Content Writing & Documentation
            </label>
            <label>
              <input type="checkbox" v-model="formData.preferredAreas" value="Logistics/Planning Support (Virtual)">
              Logistics/Planning Support (Virtual)
            </label>
          </div>
        </div>
        
        <div class="form-group">
          <label>Have you volunteered at similar events before?</label>
          <div class="radio-group">
            <label>
              <input type="radio" v-model="formData.hasVolunteeredBefore" :value="true">
              Yes
            </label>
            <label>
              <input type="radio" v-model="formData.hasVolunteeredBefore" :value="false">
              No
            </label>
          </div>
        </div>
        
        <div class="form-group" v-if="formData.hasVolunteeredBefore">
          <label for="previousExperience">If yes, briefly describe your experience:</label>
          <textarea id="previousExperience" v-model="formData.previousExperience" rows="4"></textarea>
        </div>
        
        <div class="form-group">
          <label for="volunteeringReason">Why are you interested in volunteering for this conference?</label>
          <textarea id="volunteeringReason" v-model="formData.volunteeringReason" rows="4" required></textarea>
        </div>
      </div>
      
      <!-- Additional fields for National Virtual Delegate -->
      <div class="form-section" v-if="formData.category === 'National Virtual Delegate'">
        <h2>SECTION C: National Virtual Delegate Details</h2>
        
        <div class="form-group">
          <label for="stateRepresenting">What state are you representing?</label>
          <input type="text" id="stateRepresenting" v-model="formData.stateRepresenting" required>
        </div>
        
        <div class="form-group">
          <label>What platform(s) are you most comfortable using?</label>
          <div class="checkbox-group">
            <label>
              <input type="checkbox" v-model="formData.preferredPlatforms" value="Zoom">
              Zoom
            </label>
            <label>
              <input type="checkbox" v-model="formData.preferredPlatforms" value="Google Meet">
              Google Meet
            </label>
            <label>
              <input type="checkbox" v-model="formData.preferredPlatforms" value="WhatsApp">
              WhatsApp
            </label>
            <label>
              <input type="checkbox" v-model="formData.preferredPlatforms" value="Telegram">
              Telegram
            </label>
          </div>
        </div>
        
        <div class="form-group">
          <label for="representationReason">Why do you want to represent your state at this conference?</label>
          <textarea id="representationReason" v-model="formData.representationReason" rows="4" required></textarea>
        </div>
      </div>
      
      <!-- Additional fields for International Delegate -->
      <div class="form-section" v-if="formData.category === 'International Delegate'">
        <h2>SECTION C: International Delegate Details</h2>
        
        <div class="form-group">
          <label for="countryRepresenting">Country Representing:</label>
          <input type="text" id="countryRepresenting" v-model="formData.countryRepresenting" required>
        </div>
        
        <div class="form-group">
          <label>Are you affiliated with any faith-based, diplomatic, or business leadership organization?</label>
          <div class="radio-group">
            <label>
              <input type="radio" v-model="formData.isAffiliated" :value="true">
              Yes
            </label>
            <label>
              <input type="radio" v-model="formData.isAffiliated" :value="false">
              No
            </label>
          </div>
        </div>
        
        <div class="form-group" v-if="formData.isAffiliated">
          <label for="organizationName">If yes, please specify:</label>
          <input type="text" id="organizationName" v-model="formData.organizationName" required>
        </div>
        
        <div class="form-group">
          <label for="delegateValue">What value do you hope to gain or contribute as an international delegate?</label>
          <textarea id="delegateValue" v-model="formData.delegateValue" rows="4" required></textarea>
        </div>
      </div>
      
      <!-- Section D: Commitment Declaration -->
      <div class="form-section">
        <h2>SECTION D: Commitment Declaration</h2>
        <p>By submitting this application, I commit to:</p>
        <ul>
          <li>Participating actively in the conference on the stated date</li>
          <li>Representing the values and purpose of the conference with integrity</li>
          <li>Fulfilling any role or responsibility accepted as a {{ formData.category.toLowerCase() }}</li>
        </ul>
        
        <div class="form-group">
          <label for="signature">Signature (Typed):</label>
          <input type="text" id="signature" v-model="formData.signature" required>
        </div>
        
        <div class="form-group">
          <label for="date">Date:</label>
          <input type="date" id="date" v-model="formData.date" :readonly="true" required>
        </div>
      </div>
      
      <div class="form-actions">
        <button type="submit" class="submit-btn" :disabled="isSubmitting">
          {{ isSubmitting ? 'Submitting...' : 'Submit Application' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* ...existing styles... */
.volunteer-form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1, h2, h3 {
  color: #333;
}

h1 {
  text-align: center;
  margin-bottom: 0.5rem;
}

h3 {
  text-align: center;
  margin-bottom: 2rem;
  font-weight: normal;
  color: #666;
}

.form-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="date"],
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.radio-group, .checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.radio-group label, .checkbox-group label {
  display: flex;
  align-items: center;
  font-weight: normal;
}

.radio-group input, .checkbox-group input {
  margin-right: 0.5rem;
}

.form-actions {
  text-align: center;
  margin-top: 2rem;
}

.submit-btn {
  padding: 0.75rem 2rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #2980b9;
}

.submit-btn:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.validation-error {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

/* New styles for submission messages */
.submission-success, .submission-error {
  margin: 2rem 0;
  padding: 1.5rem;
  border-radius: 5px;
  text-align: center;
}

.submission-success {
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
}

.submission-error {
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
}

.whatsapp-link {
  text-decoration: none;
  display: block;
  margin-top: 1rem;
}

.whatsapp-btn {
  padding: 0.75rem 2rem;
  background-color: #25D366;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.whatsapp-btn:hover {
  background-color: #128C7E;
}
</style>