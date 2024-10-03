import { useGetUsersQuery } from "./usersApiSlice"
import User from './User'

const UsersList = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery()

    console.log("Users query result:", { users, isLoading, isSuccess, isError, error });

    let content

    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isError) {
        content = (
            <div className="error-message">
                <p>Error: {error.error}</p>
                <p>Status: {error.status}</p>
                <p>Please try again later or contact support if the problem persists.</p>
            </div>
        )
    } else if (isSuccess && users) {
        const { ids } = users

        const tableContent = ids?.length
            ? ids.map(userId => <User key={userId} userId={userId} />)
            : <tr><td colSpan="3">No users found</td></tr>

        content = (
            <table className="table table--users">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th user__username">Username</th>
                        <th scope="col" className="table__th user__roles">Roles</th>
                        <th scope="col" className="table__th user__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    } else {
        content = <p>No data available</p>
    }

    return content
}
export default UsersList