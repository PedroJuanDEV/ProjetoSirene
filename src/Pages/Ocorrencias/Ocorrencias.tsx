import React, { useState, type JSX } from 'react';
import { LayoutDashboard, Users, FileText, BarChart, Settings, LogOut, Search, SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight, Eye, AlertCircle } from 'lucide-react';
import styles from './Ocorrencias.module.css';
import { useNavigate } from 'react-router-dom';

interface Ocorrencia {
  id: number;
  tipo: string;
  regiao: string;
  dataHora: string;
  status: 'Em aberto' | 'Fechado' | 'Andamento';
}

const mockOcorrencias: Ocorrencia[] = [
  { id: 202530, tipo: 'Acidente', regiao: 'Centro (1)', dataHora: '02/02/2025 09:30', status: 'Em aberto' },
  { id: 202531, tipo: 'Vazamento', regiao: 'Sudoeste (5)', dataHora: '02/02/2025 09:30', status: 'Fechado' },
  { id: 202532, tipo: 'Incêndio', regiao: 'Centro (1)', dataHora: '02/02/2025 09:30', status: 'Fechado' },
  { id: 202533, tipo: 'Resgate', regiao: 'Norte (2)', dataHora: '02/02/2025 09:30', status: 'Em aberto' },
  { id: 202534, tipo: 'Desabamento', regiao: 'Oeste (4)', dataHora: '02/02/2025 09:30', status: 'Andamento' },
  { id: 202535, tipo: 'Acidente', regiao: 'Sul (6)', dataHora: '02/02/2025 09:30', status: 'Andamento' },
  { id: 202536, tipo: 'Afogamento', regiao: 'Centro (1)', dataHora: '02/02/2025 09:30', status: 'Em aberto' },
  { id: 202537, tipo: 'Resgate', regiao: 'Noroeste (3)', dataHora: '02/02/2025 09:30', status: 'Fechado' },
  { id: 202538, tipo: 'Afogamento', regiao: 'Noroeste (3)', dataHora: '02/02/2025 09:30', status: 'Fechado' },
];

function ListaOcorrencias(): JSX.Element {
  const navigate = useNavigate();
  const [allOcorrencias] = useState<Ocorrencia[]>(mockOcorrencias);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'recente' | 'tipo'>('recente');
  const [currentPage, setCurrentPage] = useState(1);
  const ocorrenciasPerPage = 8;
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredOcorrencias = allOcorrencias.filter(ocorrencia =>
    ocorrencia.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ocorrencia.regiao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ocorrencia.id.toString().includes(searchTerm.toLowerCase())
  );

  const sortedOcorrencias = [...filteredOcorrencias].sort((a, b) => {
    if (sortBy === 'recente') {
      return b.id - a.id;
    }
    return a.tipo.localeCompare(b.tipo);
  });

  const totalPages = Math.max(1, Math.ceil(sortedOcorrencias.length / ocorrenciasPerPage));
  const indexOfLastOcorrencia = currentPage * ocorrenciasPerPage;
  const indexOfFirstOcorrencia = indexOfLastOcorrencia - ocorrenciasPerPage;
  const currentOcorrencias = sortedOcorrencias.slice(indexOfFirstOcorrencia, indexOfLastOcorrencia);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getStatusClass = (status: Ocorrencia['status']) => {
    switch (status) {
      case 'Em aberto': return styles.statusOpen;
      case 'Fechado': return styles.statusClosed;
      case 'Andamento': return styles.statusInProgress;
      default: return '';
    }
  };
  
  const handleMenuItemClick = (path: string) => {
    navigate(path);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    
    const maxVisiblePages = 4;
    
    
    if (totalPages > maxVisiblePages) {
        pageNumbers.push(1, 2, 3, '...', totalPages);
    } else {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    }

    return pageNumbers.map((num, index) => {
      if (num === '...') {
        return <span key={index} className={styles.pageEllipsis}>...</span>;
      }
      return (
        <button 
          key={index}
          onClick={() => paginate(num as number)}
          className={`${styles.pageNumber} ${num === currentPage ? styles.pageActive : ''}`}
        >
          {num}
        </button>
      );
    });
  };

  return (
    <div className={styles.appContainer}>
      
      <div className={styles.sidebar}>
        <div className={styles.logoSection}>
          <AlertCircle size={32} className={styles.logoIcon} /> 
          <span className={styles.logoText}>Sirene</span>
        </div>

        <nav className={styles.navMenu}>
          <div className={styles.navItem} onClick={() => handleMenuItemClick('/Inicial')}>
        <div className={styles.navIcon}><FileText size={20} /></div>
        <span className={styles.navText}>Pagina inicial</span>
      </div>


     <div className={styles.navItem} onClick={() => handleMenuItemClick('/Ocorrencias')}>
        <div className={styles.navIcon}><FileText size={20} /></div>
        <span className={styles.navText}>Lista de ocorrências</span>
      </div>

      <div className={styles.navItem} onClick={() => handleMenuItemClick('/dashboard')}>
        <div className={styles.navIcon}><LayoutDashboard size={20} /></div>
        <span className={styles.navText}>Dashboard</span>
      </div>

      <div className={`${styles.navItem} ${styles.navActive}`} onClick={() => handleMenuItemClick('/GestaoUsuario')}>
        <div className={styles.navIcon}><Users size={20} /></div>
        <span className={styles.navText}>Gestão de usuários</span>
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
          <LogOut size={20} className={styles.navIcon} />
          <span className={styles.navText}>Sair</span>
        </div>
      </div>

      <div className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Ocorrências registradas</h1>

        <div className={styles.controlsBar}>
          <div className={styles.searchFilterGroup}>
            <div className={styles.searchBox}>
              <Search size={18} className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Search" 
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button 
                className={styles.filterButton}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
                <SlidersHorizontal size={18} />
                Filter
            </button>
          </div>

          <div className={styles.sortDropdown}>
            <span>Ordenar por:</span>
            <select 
              className={styles.dropdownSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="recente">Recente</option>
              <option value="tipo">Tipo</option>
            </select>
            <ChevronDown size={18} className={styles.dropdownArrow} />
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th className={styles.headerLarge}>Tipo</th> 
                <th className={styles.headerSmall}>Id</th>
                <th className={styles.headerSmall}>Região(RPA)</th>
                <th className={styles.headerLarge}>Data/Hora</th>
                <th className={styles.headerActions}>Ações</th>
                <th className={styles.headerSmall}>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentOcorrencias.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles.emptyState}>
                    Nenhuma ocorrência encontrada.
                  </td>
                </tr>
              ) : (
                currentOcorrencias.map((ocorrencia) => (
                  <tr key={ocorrencia.id}>
                    <td>{ocorrencia.tipo}</td>
                    <td>{ocorrencia.id}</td>
                    <td>{ocorrencia.regiao}</td>
                    <td>{ocorrencia.dataHora}</td>
                    <td className={styles.actionsCell}>
                      <Eye size={16} className={styles.actionIcon} onClick={() => console.log('Ver detalhe: ' + ocorrencia.id)} />
                    </td>
                    <td>
                      <span className={`${styles.statusPill} ${getStatusClass(ocorrencia.status)}`}>
                        {ocorrencia.status}
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
            disabled={currentPage === 1}
            className={styles.pageArrow}
          >
            <ChevronLeft size={20} />
          </button>
          <div className={styles.pageNumbers}>
            {renderPageNumbers()}
          </div>
          <button 
            onClick={() => paginate(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className={styles.pageArrow}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListaOcorrencias;