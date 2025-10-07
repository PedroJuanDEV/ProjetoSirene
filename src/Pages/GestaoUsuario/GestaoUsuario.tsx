import React, { useState, type JSX } from 'react';
import { Search, SlidersHorizontal, Plus, ChevronDown, ChevronLeft, ChevronRight, Edit, Trash2, LogOut, Eye, LayoutDashboard, Users, FileText, BarChart, Settings } from 'lucide-react';
import styles from './GestaoUsuario.module.css';
import { useNavigate } from 'react-router-dom';

interface User {
id: number;
nome: string;
cargo: string;
numero: string;
email: string;
status: 'Em serviço' | 'Fora de serviço';
}

const mockUsers: User[] = [
{ id: 1, nome: 'Ana Silva', cargo: 'Analista', numero: '1199999999', email: 'ana.silva@email.com', status: 'Em serviço' },
{ id: 2, nome: 'João Souza', cargo: 'Bombeiro', numero: '2198888888', email: 'joao.souza@email.com', status: 'Fora de serviço' },
];

function GestaoUsuarios(): JSX.Element {
const navigate = useNavigate();
const [allUsers] = useState<User[]>(mockUsers);
const [isModalOpen, setIsModalOpen] = useState(false);
const [sortBy, setSortBy] = useState<'recente' | 'nome'>('recente');
const [filterBy, setFilterBy] = useState<'todos' | 'Em serviço' | 'Fora de serviço'>('todos');
const [currentPage, setCurrentPage] = useState(1);
const usersPerPage = 8;

const filteredUsers = allUsers.filter(user => {
if (filterBy === 'todos') return true;
return user.status === filterBy;
});

const sortedUsers = [...filteredUsers].sort((a, b) => {
if (sortBy === 'recente') {
return b.id - a.id;
}
return a.nome.localeCompare(b.nome);
});

const totalPages = Math.max(1, Math.ceil(sortedUsers.length / usersPerPage));
const indexOfLastUser = currentPage * usersPerPage;
const indexOfFirstUser = indexOfLastUser - usersPerPage;
const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

const getStatusClass = (status: User['status']) => {
return status === 'Em serviço' ? styles.statusActive : styles.statusInactive;
};

const renderPageNumbers = () => {
if (totalPages === 1) {
return (
<button className={`${styles.pageNumber} ${styles.pageActive}`}>
1 </button>
);
}
return <p>Paginação...</p>;
};

const handleMenuItemClick = (path: string) => {
navigate(path);
};

return ( <div className={styles.appContainer}> 
  <div className={styles.sidebar}> 
    <div className={styles.logoSection}> 
      <div className={styles.logo}>S</div> 
      <span className={styles.logoText}>Sirene</span> 
    </div>

    <nav className={styles.navMenu}>
      <div className={styles.navItem} onClick={() => handleMenuItemClick('/dashboard')}>
        <div className={styles.navIcon}><LayoutDashboard size={20} /></div>
        <span className={styles.navText}>Dashboard</span>
      </div>
      <div className={`${styles.navItem} ${styles.navActive}`} onClick={() => handleMenuItemClick('/gestao-usuarios')}>
        <div className={styles.navIcon}><Users size={20} /></div>
        <span className={styles.navText}>Gestão de usuários</span>
      </div>
      <div className={styles.navItem} onClick={() => handleMenuItemClick('/Ocorrencias')}>
        <div className={styles.navIcon}><FileText size={20} /></div>
        <span className={styles.navText}>Lista de ocorrências</span>
      </div>
      <div className={styles.navItem} onClick={() => handleMenuItemClick('/auditoria')}>
        <div className={styles.navIcon}><BarChart size={20} /></div>
        <span className={styles.navText}>Auditoria e logs</span>
      </div>
      <div className={styles.navItem} onClick={() => handleMenuItemClick('/configuracao')}>
        <div className={styles.navIcon}><Settings size={20} /></div>
        <span className={styles.navText}>Configuração</span>
      </div>
    </nav>

    <div className={styles.navItem} onClick={() => handleMenuItemClick('/')}>
      <div className={styles.navIcon}><LogOut size={20} /></div>
      <span className={styles.navText}>Sair</span>
    </div>
  </div>

  <div className={styles.mainContent}>
    <div className={styles.contentCard}>
      <h1 className={styles.pageTitle}>Usuários cadastrados</h1>

      <div className={styles.controlsBar}>
        <div className={styles.searchBox}>
          <Search size={20} className={styles.searchIcon} />
          <input type="text" placeholder="Search" className={styles.searchInput} />
        </div>

        <div className={styles.dropdown}>
          <span>Filtrar: </span>
          <select 
            className={styles.dropdownButton}
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as any)}
          >
            <option value="todos">Todos</option>
            <option value="Em serviço">Em serviço</option>
            <option value="Fora de serviço">Fora de serviço</option>
          </select>
        </div>

        <div className={styles.spacer}></div>

        <button 
          className={`${styles.button} ${styles.buttonPrimary}`} 
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={20} />
          novo usuário
        </button>

        <div className={styles.dropdown}>
          <span>Ordenar por: </span>
          <select 
            className={styles.dropdownButton}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="recente">Recente</option>
            <option value="nome">Nome (A-Z)</option>
          </select>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th className={styles.headerSmall}>Nome</th>
              <th className={styles.headerSmall}>Cargo</th>
              <th className={styles.headerSmall}>Número</th>
              <th className={styles.headerLarge}>Email</th>
              <th className={styles.headerActions}>Ações</th>
              <th className={styles.headerSmall}>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.emptyState}>
                  Nenhum usuário encontrado. Adicione um novo usuário.
                </td>
              </tr>
            ) : (
              currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.nome}</td>
                  <td>{user.cargo}</td>
                  <td>{user.numero}</td>
                  <td>{user.email}</td>
                  <td className={styles.actionsCell}>
                    <Edit size={16} className={styles.actionIcon} />
                    <Eye size={16} className={styles.actionIcon} />
                    <Trash2 size={16} className={styles.actionIcon} />
                  </td>
                  <td>
                    <span className={`${styles.statusPill} ${getStatusClass(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <button 
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1 || totalPages === 1}
          className={styles.pageArrow}
        >
          <ChevronLeft size={20} />
        </button>
        {renderPageNumbers()}
        <button 
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage === totalPages || totalPages === 1}
          className={styles.pageArrow}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  </div>

  {isModalOpen && (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Cadastrar Novo Usuário</h2>
        <form className={styles.form}>
          <input type="text" placeholder="Nome" required />
          <input type="text" placeholder="Cargo" required />
          <input type="text" placeholder="Número" required />
          <input type="email" placeholder="Email" required />
          <select required>
            <option value="">Selecione o status</option>
            <option value="Em serviço">Em serviço</option>
            <option value="Fora de serviço">Fora de serviço</option>
          </select>
          <div className={styles.modalActions}>
            <button 
              type="button" 
              className={styles.button} 
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </button>
            <button type="submit" className={`${styles.button} ${styles.buttonPrimary}`}>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</div>
);
}

export default GestaoUsuarios;