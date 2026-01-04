import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ContentList from './components/ContentList/ContentList';
import ContentEditor from './components/ContentEditor/ContentEditor';
import UserManual from './components/UserManual/UserManual';

function App() {
    const location = useLocation();
    const isManualPage = location.pathname === '/manual';

    // Don't show header on manual page for cleaner display
    if (isManualPage) {
        return (
            <div className="app">
                {/* <header className="header" style={{ height: '60px' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h1>📚 User Manual</h1>
                    </Link>
                    <nav>
                        <Link to="/" className="btn btn-secondary btn-sm">
                            ⚙️ Admin Portal
                        </Link>
                    </nav>
                </header> */}
                <UserManual />
            </div>
        );
    }

    return (
        <div className="app">
            <header className="header">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h1>📚 User Manual Admin</h1>
                </Link>
                <nav>
                    <Link to="/" className="btn btn-secondary btn-sm">
                        📋 Dashboard
                    </Link>
                    <Link to="/create" className="btn btn-primary btn-sm">
                        ➕ New Content
                    </Link>
                    <Link to="/manual" className="btn btn-success btn-sm">
                        🌐 View Manual
                    </Link>
                </nav>
            </header>

            <main className="main-content">
                <Routes>
                    <Route path="/" element={<ContentList />} />
                    <Route path="/create" element={<ContentEditor />} />
                    <Route path="/edit/:id" element={<ContentEditor />} />
                    <Route path="/manual" element={<UserManual />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
