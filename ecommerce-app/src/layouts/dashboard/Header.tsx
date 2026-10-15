
import Avatar from '../../widgets/dashboard/header/Avatar'
import LanguageSwitcher from '../../widgets/dashboard/header/ChangeLang'
import Notification from '../../widgets/dashboard/header/Notifications'
// import { SearchIcon} from "lucide-react";


export default function Header() {
    // const [search, setSearch] = useState("");
    return (
        <>
        <header className="panel_header">
            <div className="box_search_header">
                {/* <div className="box_input">
                    <input
                        type="search"
                        className="input_search"
                        placeholder="Rechercher..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="in_icon text text_sm"><SearchIcon size={16} /></div>
                </div> */}
            </div>
            

            <div className="panel_header__actions">
                <LanguageSwitcher />
                <Notification />
                <Avatar />
            </div>

        </header>
        </>
    );
}