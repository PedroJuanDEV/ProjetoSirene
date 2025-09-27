import React, { useState, type JSX } from 'react';
import { Search, SlidersHorizontal, Plus, ChevronDown, ChevronLeft, ChevronRight, Edit, Trash2, LogOut } from 'lucide-react';
import styles from './GestaoUsuario.module.css';

// Interface básica para tipagem, mantenha esta estrutura para a integração do banco de dados
interface User {
  id: number;
  nome: string;
  cargo: string;
  numero: string;
  email: string;
  status: 'Em serviço' | 'Fora de serviço'; // Tipos literais para o status
}

// ** MOCK DATA REMOVIDO **
// Utilize esta lista vazia para a integração
const mockUsers: User[] = []; 

function GestaoUsuarios(): JSX.Element {
  // Simulação de dados (dados reais virão do seu backend)
  const allUsers: User[] = mockUsers; 
  
  // Lógica de Paginação (Adaptada para funcionar mesmo com lista vazia, mostrando 1 página)
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;
  const totalPages = Math.max(1, Math.ceil(allUsers.length / usersPerPage)); // Garante pelo menos 1 página
  
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Define a classe de estilo com base no status
  const getStatusClass = (status: User['status']) => {
    return status === 'Em serviço' ? styles.statusActive : styles.statusInactive;
  };

  // Renderiza os números da paginação (Lógica simplificada para lista vazia)
  const renderPageNumbers = () => {
    if (totalPages === 1) {
      return (
        <button className={`${styles.pageNumber} ${styles.pageActive}`}>
          1
        </button>
      );
    }
    // Lógica completa de paginação omitida aqui, mas existe no código anterior se necessário
    return <p>Paginação...</p>;
  };
  
  // Função Placeholder para o menu lateral
  const handleMenuItemClick = (item: string) => {
      console.log(`Navegando para: ${item}`);
      // Em um ambiente real, usaria navigate('/caminho')
  };

  return (
    <div className={styles.appContainer}>
      
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.logoSection}>
          <div className={styles.logo}>S</div>
          <span className={styles.logoText}>Sirene</span>
        </div>

        <nav className={styles.navMenu}>
          <div className={styles.navItem} onClick={() => handleMenuItemClick('Dashboard')}>
            <div className={styles.navIcon}><SlidersHorizontal size={20} /></div>
            <span className={styles.navText}>Dashboard</span>
          </div>
          
          <div className={`${styles.navItem} ${styles.navActive}`} onClick={() => handleMenuItemClick('Gerir Usuários')}>
            <div className={styles.navIcon}><SlidersHorizontal size={20} /></div>
            <span className={styles.navText}>Gestão de usuários</span>
          </div>
          
          <div className={styles.navItem} onClick={() => handleMenuItemClick('Ocorrências')}>
            <div className={styles.navIcon}><SlidersHorizontal size={20} /></div>
            <span className={styles.navText}>Lista de ocorrências</span>
          </div>
          
          <div className={styles.navItem} onClick={() => handleMenuItemClick('Auditoria')}>
            <div className={styles.navIcon}><SlidersHorizontal size={20} /></div>
            <span className={styles.navText}>Auditoria e logs</span>
          </div>
          
          <div className={styles.navItem} onClick={() => handleMenuItemClick('Configuração')}>
            <div className={styles.navIcon}><SlidersHorizontal size={20} /></div>
            <span className={styles.navText}>Configuração</span>
          </div>
          
        </nav>
        
        <div className={styles.navItem} onClick={() => handleMenuItemClick('Sair')}>
            <div className={styles.navIcon}><LogOut size={20} /></div>
            <span className={styles.navText}>Sair</span>
          </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.contentCard}>
          <h1 className={styles.pageTitle}>Usuários cadastrados</h1>

          {/* Controls / Filter Bar */}
          <div className={styles.controlsBar}>
            
            {/* Search Input */}
            <div className={styles.searchBox}>
              <Search size={20} className={styles.searchIcon} />
              <input type="text" placeholder="Search" className={styles.searchInput} />
            </div>

            {/* Filter Button */}
            <button className={`${styles.button} ${styles.buttonFilter}`}>
              <SlidersHorizontal size={20} />
              Filter
            </button>
            
            <div className={styles.spacer}></div>

            {/* New User Button */}
            <button className={`${styles.button} ${styles.buttonPrimary}`}>
              <Plus size={20} />
              novo usuário
            </button>
            
            {/* Order By Dropdown */}
            <div className={styles.dropdown}>
              <span>Ordenar por: </span>
              <button className={styles.dropdownButton}>
                Recente <ChevronDown size={16} />
              </button>
            </div>
          </div>

          {/* Users Table */}
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
          
          {/* Pagination */}
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
    </div>
  );
}

export default GestaoUsuarios;
