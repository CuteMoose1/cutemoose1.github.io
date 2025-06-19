<template>
  <v-app>
    <!-- Navbar -->
    <v-app-bar color="indigo darken-3" dark elevate-on-scroll app fixed>
      <v-container>
        <v-row align="center" no-gutters class="d-flex align-center">
          <!-- Logo and Title -->
          <v-col class="d-flex align-center">
            <v-icon
              class="logo-icon mr-2"
              style="
                font-family: &quot;Poppins&quot;, sans-serif;
                font-size: 24px;
              "
              >mdi-school</v-icon
            >
            <v-toolbar-title
              class="title"
              style="
                font-family: &quot;Poppins&quot;, sans-serif;
                font-size: 24px;
              "
              @click="goHome"
              >StudySync</v-toolbar-title
            >
          </v-col>

          <!-- Desktop Navigation Links -->
          <v-col class="d-none d-md-flex justify-end align-center">
            <v-btn
              text
              to="/"
              class="nav-btn"
              :class="{ 'active-link': $route.path === '/' }"
              style="
                font-family: &quot;Poppins&quot;, sans-serif;
                font-size: 16px;
              "
            >
              <v-icon class="nav-icon">mdi-home</v-icon> Home
            </v-btn>
            <v-btn
              text
              to="/profile"
              class="nav-btn"
              :class="{ 'active-link': $route.path === '/profile' }"
              style="
                font-family: &quot;Poppins&quot;, sans-serif;
                font-size: 16px;
              "
            >
              <v-icon class="nav-icon">mdi-account</v-icon> Profile
            </v-btn>
            <v-btn
              text
              to="/register"
              class="nav-btn"
              :class="{ 'active-link': $route.path === '/register' }"
              style="
                font-family: &quot;Poppins&quot;, sans-serif;
                font-size: 16px;
              "
            >
              <v-icon class="nav-icon">mdi-account-plus</v-icon> Register
            </v-btn>
            <v-btn
              v-if="!isAuthenticated"
              text
              to="/login"
              class="nav-btn"
              :class="{ 'active-link': $route.path === '/login' }"
              style="
                font-family: &quot;Poppins&quot;, sans-serif;
                font-size: 16px;
              "
            >
              <v-icon class="nav-icon">mdi-login</v-icon> Login
            </v-btn>
            <v-btn
              v-if="isAuthenticated"
              text
              @click="logout"
              class="nav-btn"
              style="
                font-family: &quot;Poppins&quot;, sans-serif;
                font-size: 16px;
                color: red;
              "
            >
              <v-icon class="nav-icon">mdi-logout</v-icon> Logout
            </v-btn>
          </v-col>

          <!-- Mobile Menu Icon -->
          <v-col class="d-flex d-md-none justify-end">
            <v-app-bar-nav-icon
              class="mobile-menu-icon"
              @click="drawer = !drawer"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <!-- Mobile Drawer for Navigation -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      fixed
      left
      width="250"
      overlay
      class="indigo darken-3"
    >
      <v-list dense>
        <v-list-item to="/" @click="closeDrawer" class="mobile-nav-item">
          <v-list-item-icon>
            <v-icon class="mobile-nav-icon">mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content
            style="
              font-family: &quot;Poppins&quot;, sans-serif;
              font-size: 16px;
            "
            >Home</v-list-item-content
          >
        </v-list-item>

        <v-list-item to="/profile" @click="closeDrawer" class="mobile-nav-item">
          <v-list-item-icon>
            <v-icon class="mobile-nav-icon">mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content
            style="
              font-family: &quot;Poppins&quot;, sans-serif;
              font-size: 16px;
            "
            >Profile</v-list-item-content
          >
        </v-list-item>

        <v-list-item
          to="/register"
          @click="closeDrawer"
          class="mobile-nav-item"
        >
          <v-list-item-icon>
            <v-icon class="mobile-nav-icon">mdi-account-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content
            style="
              font-family: &quot;Poppins&quot;, sans-serif;
              font-size: 16px;
            "
            >Register</v-list-item-content
          >
        </v-list-item>

        <v-list-item
          v-if="!isAuthenticated"
          to="/login"
          @click="closeDrawer"
          class="mobile-nav-item"
        >
          <v-list-item-icon>
            <v-icon class="mobile-nav-icon">mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-content
            style="
              font-family: &quot;Poppins&quot;, sans-serif;
              font-size: 16px;
            "
            >Login</v-list-item-content
          >
        </v-list-item>

        <v-list-item
          v-if="isAuthenticated"
          @click="logoutAndCloseDrawer"
          class="mobile-nav-item"
          style="color: red"
        >
          <v-list-item-icon>
            <v-icon class="mobile-nav-icon" style="color: red"
              >mdi-logout</v-icon
            >
          </v-list-item-icon>
          <v-list-item-content
            style="
              font-family: &quot;Poppins&quot;, sans-serif;
              font-size: 16px;
            "
            >Logout</v-list-item-content
          >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content Area -->
    <v-main class="main-content">
      <router-view />
      <!-- Ensure only one router-view here -->
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios"; // Assuming Axios is used for HTTP requests

export default {
  data() {
    return {
      drawer: false, // For controlling the mobile menu drawer
      tokenCheckInterval: null, // For managing the periodic validation interval
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]), // Gets authentication state from Vuex
  },
  methods: {
    goHome() {
      this.$router.push("/"); // Navigate to the home page
    },
    ...mapActions(["logout"]), // Vuex action for logging out
    closeDrawer() {
      this.drawer = false; // Close the navigation drawer
    },
    logoutAndCloseDrawer() {
      this.logout(); // Log out and update state
      this.drawer = false; // Close the drawer
    },
    async fetchUserProfile() {
      const token = localStorage.getItem("token"); // Retrieve the token
      if (!token) {
        this.forceLogout();
        return;
      }

      try {
        const { data } = await axios.get(
          "https://studysync-study-buddy-app.onrender.com/api/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        console.log("Token is valid. User profile fetched:", data.user);
      } catch (error) {
        console.error("Token validation failed:", error.message);

        // Clear token and redirect
        this.forceLogout();
      }
    },

    forceLogout() {
      // Clear the token
      localStorage.removeItem("token");

      this.logout(); // Log out to update the state

      // Check if the user is already on the login page
      if (this.$route.path !== "/login") {
        if (this.$route.path === "/home" || this.$route.path === "/profile") {
          console.log("Redirecting to login...");
          this.$router.replace("/login"); // Use Vue Router for SPA navigation
        } else {
          console.log("User is not on /home or /profile. No redirect.");
        }
      } else {
        console.log("Already on login page.");
      }
    },
  },
  created() {
    // Perform initial token validation
    this.fetchUserProfile();

    // Set up periodic validation every 5 seconds
    this.tokenCheckInterval = setInterval(this.fetchUserProfile, 5000);
  },
  beforeUnmount() {
    // Clear the interval to prevent memory leaks
    if (this.tokenCheckInterval) {
      clearInterval(this.tokenCheckInterval);
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

.title:hover {
  color: #ffeb3b;
  cursor: pointer;
}

.v-app-bar {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
  width: 100%;
}

.v-app-bar:hover {
  background-color: #3a3a9e;
}

.logo-icon {
  font-size: 28px;
  color: #ffeb3b;
  margin-right: 12px;
}

.nav-btn {
  color: white;
  font-weight: 500;
  text-transform: uppercase;
  margin: 0 10px;
  padding: 6px 10px;
  font-family: "Poppins", sans-serif;
  transition:
    color 0.3s ease,
    transform 0.2s ease;
  display: flex;
  align-items: center;
}

.nav-icon {
  margin-right: 10px;
}

.nav-btn:hover {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.active-link {
  color: #ffeb3b !important;
  border-bottom: 2px solid #ffeb3b;
  border-radius: 2px;
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
}

.mobile-nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.mobile-nav-icon {
  margin-right: 10px;
  color: #333;
}

.v-navigation-drawer {
  border-radius: 0 8px 8px 0;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}

.v-list-item {
  transition: background-color 0.3s ease;
}

.v-list-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.main-content {
  margin-top: 64px;
  padding: 24px;
}

.mobile-menu-icon {
  color: #ffffff;
  font-size: 26px;
}
</style>
