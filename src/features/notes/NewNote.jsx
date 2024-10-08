import NewNoteForm from './NewNoteForm'
import { useGetUsersQuery } from '../users/usersApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const NewNote = () => {
    useTitle('techNotes: New Note')

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data, isLoading, isSuccess, isError, error }) => ({
            data: data?.ids.map(id => data?.entities[id]),
            isLoading,
            isSuccess,
            isError,
            error
        }),
    })

    let content

    if (isLoading) {
        content = <PulseLoader color={"#FFF"} />
    } else if (isError) {
        content = <p className="errmsg">{error?.data?.message || 'Failed to load users'}</p>
    } else if (isSuccess && users?.length) {
        content = <NewNoteForm users={users} />
    } else if (isSuccess && !users?.length) {
        content = <p className="errmsg">No users found</p>
    }

    return content
}

export default NewNote