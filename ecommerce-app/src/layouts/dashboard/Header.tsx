
import Avatar from '../../widgets/dashboard/header/Avatar'
import Notifications from '../../widgets/dashboard/header/Notifications'

export default function Header() {

    return (
        <>
        <header className="panel_header">
            <div className=""></div>

            <div className="panel_header__actions">
                <Notifications />
                <Avatar />
            </div>

        </header>
        </>
    );
}