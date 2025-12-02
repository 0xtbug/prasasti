export const isAdminAuthenticated = (): boolean => {
  return localStorage.getItem("admin-auth") === "true";
};

export const isStudentAuthenticated = (): boolean => {
  return localStorage.getItem("student-auth") === "true";
};

export const setAdminAuth = (walletAddress: string) => {
  localStorage.removeItem("student-auth");
  localStorage.removeItem("student-wallet");
  localStorage.removeItem("student-id");

  localStorage.setItem("admin-auth", "true");
  localStorage.setItem("admin-wallet", walletAddress);
};

export const setStudentAuth = (walletAddress: string, studentId: string) => {
  localStorage.removeItem("admin-auth");
  localStorage.removeItem("admin-wallet");

  localStorage.setItem("student-auth", "true");
  localStorage.setItem("student-wallet", walletAddress);
  localStorage.setItem("student-id", studentId);
};

export const logout = () => {
  localStorage.removeItem("admin-auth");
  localStorage.removeItem("admin-wallet");
  localStorage.removeItem("student-auth");
  localStorage.removeItem("student-wallet");
  localStorage.removeItem("student-id");

  // Disconnect wallet - this will be handled by the Navbar component
  // Return true to signal that wallet should be disconnected
  return true;
};
