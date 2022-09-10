export const logout = () => {
    localStorage.clear();
    window.location.pathname = '/login'; // window refresh, reducers back to initial stage
}