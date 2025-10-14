import React, { useState, type JSX } from 'react';
import { LayoutDashboard, Users, FileText, BarChart, Settings, LogOut, Search, SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight, Eye, AlertCircle, Plus } from 'lucide-react';
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
  
  { id: 202530, tipo: 'Acidente', regiao: 'Recife (COM)', dataHora: '02/02/2025 06:30', status: 'Em aberto' },
  { id: 202531, tipo: 'Vazamento', regiao: 'Camaragibe (COM)', dataHora: '02/02/2025 07:33', status: 'Fechado' },
  { id: 202532, tipo: 'Incêndio', regiao: 'Paulista (COM)', dataHora: '02/02/2025 07:35', status: 'Fechado' },
  { id: 202533, tipo: 'Resgate', regiao: 'Caruaru (COInter/I)', dataHora: '02/02/2025 08:30', status: 'Em aberto' },
  { id: 202534, tipo: 'Desabamento', regiao: 'Recife (COM)', dataHora: '02/02/2025 10:30', status: 'Andamento' },
  { id: 202535, tipo: 'Acidente', regiao: 'Recife (COM)', dataHora: '02/02/2025 11:00', status: 'Andamento' },
  { id: 202536, tipo: 'Afogamento', regiao: 'Bezerros (COInter/I)', dataHora: '02/02/2025 12:30', status: 'Em aberto' },
  { id: 202537, tipo: 'Resgate', regiao: 'Carpina (COInter/I)', dataHora: '02/02/2025 13:30', status: 'Fechado' },
  { id: 202538, tipo: 'Afogamento', regiao: 'Recife (COM)', dataHora: '02/02/2025 19:00', status: 'Fechado' },
];


interface MetricCardProps {
    title: string;
    value: string;
    unit?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit }) => (
    <div className={styles.metricCard}>
        <span className={styles.metricTitle}>{title}</span>
        <div className={styles.metricValueGroup}>
            <span className={styles.metricValue}>{value}</span>
            {unit && <span className={styles.metricUnit}>{unit}</span>}
        </div>
    </div>
);


function ListaOcorrencias(): JSX.Element {
  const navigate = useNavigate();
  const [allOcorrencias] = useState<Ocorrencia[]>(mockOcorrencias);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'recente' | 'tipo'>('recente');
  const [currentPage, setCurrentPage] = useState(1);
  const ocorrenciasPerPage = 8;
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const totalOcorrencias = 530; 
  const ocorrenciasAbertas = 30; 
  const tempoMedioResposta = '17min'; 

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
    const maxPagesToShow = 5; 
    
    
    if (totalPages > maxPagesToShow) {
        pageNumbers.push(1, 2, 3, 4, '...', totalPages);
    } else {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    }

    return [1, 2, 3, 4, '...', 40].map((num, index) => { 
      if (num === '...') {
        return <span key={index} className={styles.pageEllipsis}>...</span>;
      }
      const pageNum = num as number;
      return (
        <button 
          key={index}
          onClick={() => paginate(pageNum)}
          className={`${styles.pageNumber} ${pageNum === currentPage ? styles.pageActive : ''}`}
        >
          {num}
        </button>
      );
    });
  };

  return (
    <div className={styles.appContainer}>
      
      {/* SIDEBAR */}
      <div className={styles.sidebar}>
        <div className={styles.logoSection}>
          <div className={styles.sLogo}>S</div> 
        </div>

        <nav className={styles.navMenu}>
          
          <div className={`${styles.navItem} ${styles.navActive}`} onClick={() => handleMenuItemClick('/Inicial')}>
            <div className={styles.navIcon}><FileText size={20} /></div>
            <span className={styles.navText}>Pagina inicial</span>
          </div>


          <div className={`${styles.navItem} ${styles.navActive}`} onClick={() => handleMenuItemClick('/Ocorrencias')}>
            <div className={styles.navIcon}><FileText size={20} /></div>
            <span className={styles.navText}>Lista de ocorrências</span>
          </div>

          <div className={styles.navItem} onClick={() => handleMenuItemClick('/dashboard')}>
            <div className={styles.navIcon}><LayoutDashboard size={20} /></div>
            <span className={styles.navText}>Dashboard</span>
          </div>

          <div className={styles.navItem} onClick={() => handleMenuItemClick('/GestaoUsuario')}>
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

        {/* Item "Sair" na parte inferior */}
        <div className={styles.navItem} onClick={() => handleMenuItemClick('/')}>
          <LogOut size={20} className={styles.navIcon} />
          <span className={styles.navText}>Sair</span>
        </div>
      </div>

      <div className={styles.mainContent}>
        
        {/* Título da Página */}
        <h1 className={styles.pageHeaderTitle}>Lista de Ocorrências - ADMIN</h1>

        {/* BARRA DE CONTROLES (AGORA ACIMA DOS CARDS) */}
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
                Filtro
            </button>
          </div>
          
          <div className={styles.controlsRightGroup}>
            <button className={styles.newOcorrenciaButton}>
                <Plus size={18} /> 
                nova ocorrência
            </button>

            
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
        </div>

        {/* CARDS DE MÉTRICAS (AGORA ABAIXO DOS CONTROLES) */}
        <div className={styles.metricCardsContainer}>
            <MetricCard 
                title="Total de Ocorrências" 
                value={totalOcorrencias.toString()} 
            />
            <MetricCard 
                title="Ocorrências Abertas" 
                value={ocorrenciasAbertas.toString()} 
            />
            <MetricCard 
                title="Tempo Médio de Resposta" 
                value="17" 
                unit="min" 
            />
        </div>


        {/* Tabela de Ocorrências */}
        <div className={styles.tableContainer}>
          <table className={styles.userTable}>
            <thead>
              <tr>
                
                <th className={styles.headerLarge}>TIPO</th> 
                <th className={styles.headerSmall}>ID</th>
                <th className={styles.headerMedium}>REGIÃO</th>
                <th className={styles.headerMedium}>DATA/HORA</th>
                <th className={styles.headerActions}>AÇÕES</th>
                <th className={styles.headerSmall}>STATUS</th>
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
                        <span onClick={() => console.log('Ver detalhe: ' + ocorrencia.id)}>Ver detalhe</span>
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

        {/* Paginação */}
        <div className={styles.pagination}>
          <div className={styles.pageNumbers}>
            {renderPageNumbers()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListaOcorrencias;