
      class UserManager {
        constructor() {
          this.baseURL = "https://jsonplaceholder.typicode.com";
          this.users = [];
          this.currentUserId = null;
          this.userModal = new bootstrap.Modal(
            document.getElementById("userModal")
          );

          this.initializeEventListeners();
          this.loadUsers();
        }

        initializeEventListeners() {
          $("#addUserBtn").on("click", () => this.openAddModal());

          $("#userForm").on("submit", (e) => this.handleFormSubmit(e));

          $("#userModal").on("hidden.bs.modal", () => {
            this.resetForm();
          });
        }

        showLoading() {
          $("#loadingSpinner").show();
          $("#usersGrid").hide();
        }

        hideLoading() {
          $("#loadingSpinner").hide();
          $("#usersGrid").show();
        }

        showToast(message, type = "success") {
          const toast = $(`
                    <div class="toast align-items-center text-bg-${type} border-0" role="alert">
                        <div class="d-flex">
                            <div class="toast-body">
                                <i class="fas fa-${
                                  type === "success"
                                    ? "check-circle"
                                    : "exclamation-triangle"
                                } me-2"></i>
                                ${message}
                            </div>
                            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                        </div>
                    </div>
                `);

          $(".toast-container").append(toast);
          const bsToast = new bootstrap.Toast(toast[0]);
          bsToast.show();

          toast.on("hidden.bs.toast", () => toast.remove());
        }

        async loadUsers() {
          this.showLoading();

          try {
            const response = await $.ajax({
              url: `${this.baseURL}/users`,
              method: "GET",
              dataType: "json",
            });

            this.users = response;
            this.renderUsers();
            this.updateStats();
            this.showToast("Users loaded successfully!");
          } catch (error) {
            console.error("Error loading users:", error);
            this.showToast("Failed to load users. Please try again.", "danger");
          } finally {
            this.hideLoading();
          }
        }

        renderUsers() {
          const usersGrid = $("#usersGrid");

          if (!this.users || this.users.length === 0) {
            usersGrid.html(`
                        <div class="empty-state">
                            <i class="fas fa-users"></i>
                            <h3>No Users Found</h3>
                            <p>Click "Add New User" to create your first user.</p>
                        </div>
                    `);
            return;
          }

          const usersHTML = this.users
            .map(
              (user) => `
                    <div class="col-md-6 col-lg-4">
                        <div class="card user-card">
                            <div class="card-body">
                                <div class="d-flex align-items-center mb-3">
                                    <div class="user-avatar me-3">
                                        ${user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h5 class="card-title mb-1">${this.escapeHTML(
                                          user.name
                                        )}</h5>
                                        <p class="text-muted mb-0">@${this.escapeHTML(
                                          user.username
                                        )}</p>
                                    </div>
                                </div>
                                
                                <p class="card-text">
                                    <i class="fas fa-envelope me-2 text-primary"></i>
                                    ${this.escapeHTML(user.email)}
                                </p>
                                
                                ${
                                  user.phone
                                    ? `
                                    <p class="card-text">
                                        <i class="fas fa-phone me-2 text-success"></i>
                                        ${this.escapeHTML(user.phone)}
                                    </p>
                                `
                                    : ""
                                }
                                
                                ${
                                  user.website
                                    ? `
                                    <p class="card-text">
                                        <i class="fas fa-globe me-2 text-info"></i>
                                        ${this.escapeHTML(user.website)}
                                    </p>
                                `
                                    : ""
                                }
                                
                                ${
                                  user.company
                                    ? `
                                    <p class="card-text">
                                        <i class="fas fa-building me-2 text-warning"></i>
                                        ${this.escapeHTML(user.company.name)}
                                    </p>
                                `
                                    : ""
                                }
                                
                                <div class="btn-group w-100">
                                    <button class="btn btn-outline-primary btn-sm" onclick="userManager.editUser(${
                                      user.id
                                    })">
                                        <i class="fas fa-edit"></i> Edit
                                    </button>
                                    <button class="btn btn-outline-danger btn-sm" onclick="userManager.deleteUser(${
                                      user.id
                                    })">
                                        <i class="fas fa-trash"></i> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            )
            .join("");

          usersGrid.html(usersHTML);
        }

        updateStats() {
          $("#totalUsers").text(this.users.length);
          $("#activeUsers").text(
            this.users.filter((user) => user.id <= 10).length
          );
        }

        openAddModal() {
          $("#modalTitle").text("Add New User");
          this.resetForm();
          this.userModal.show();
        }

        async editUser(userId) {
          try {
            const response = await $.ajax({
              url: `${this.baseURL}/users/${userId}`,
              method: "GET",
              dataType: "json",
            });

            this.currentUserId = userId;
            $("#modalTitle").text("Edit User");
            this.populateForm(response);
            this.userModal.show();
          } catch (error) {
            console.error("Error loading user:", error);
            this.showToast("Failed to load user data.", "danger");
          }
        }

        populateForm(user) {
          $("#userId").val(user.id);
          $("#name").val(user.name || "");
          $("#username").val(user.username || "");
          $("#email").val(user.email || "");
          $("#phone").val(user.phone || "");
          $("#website").val(user.website || "");
          $("#company").val(user.company?.name || "");
          $("#address").val(
            user.address
              ? `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`
              : ""
          );
        }

        resetForm() {
          $("#userId").val("");
          $("#userForm")[0].reset();
          this.currentUserId = null;
        }

        async handleFormSubmit(e) {
          e.preventDefault();

          const userData = {
            name: $("#name").val().trim(),
            username: $("#username").val().trim(),
            email: $("#email").val().trim(),
            phone: $("#phone").val().trim(),
            website: $("#website").val().trim(),
            company: {
              name: $("#company").val().trim(),
            },
          };

          if (!userData.name || !userData.username || !userData.email) {
            this.showToast("Please fill in all required fields.", "warning");
            return;
          }

          const isEditing = !!this.currentUserId;

          try {
            let response;

            if (isEditing) {
              response = await $.ajax({
                url: `${this.baseURL}/users/${this.currentUserId}`,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(userData),
                dataType: "json",
              });

              this.showToast("User updated successfully!");
            } else {
              response = await $.ajax({
                url: `${this.baseURL}/users`,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(userData),
                dataType: "json",
              });

              this.showToast("User created successfully!");
            }

            if (isEditing) {
              const index = this.users.findIndex(
                (u) => u.id === this.currentUserId
              );
              if (index !== -1) {
                this.users[index] = { ...this.users[index], ...response };
              }
            } else {
              response.id = Date.now(); 
              this.users.unshift(response);
            }

            this.userModal.hide();
            this.renderUsers();
            this.updateStats();
          } catch (error) {
            console.error("Error saving user:", error);
            this.showToast(
              `Failed to ${
                isEditing ? "update" : "create"
              } user. Please try again.`,
              "danger"
            );
          }
        }

        async deleteUser(userId) {
          if (
            !confirm(
              "Are you sure you want to delete this user? This action cannot be undone."
            )
          ) {
            return;
          }

          try {
            await $.ajax({
              url: `${this.baseURL}/users/${userId}`,
              method: "DELETE",
              dataType: "json",
            });

            this.users = this.users.filter((user) => user.id !== userId);

            this.renderUsers();
            this.updateStats();
            this.showToast("User deleted successfully!");
          } catch (error) {
            console.error("Error deleting user:", error);
            this.showToast(
              "Failed to delete user. Please try again.",
              "danger"
            );
          }
        }

        escapeHTML(unsafe) {
          if (!unsafe) return "";
          return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
        }
      }

      const userManager = new UserManager();
