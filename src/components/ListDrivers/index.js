import React, {useState} from 'react';
import { Table, Pagination, PaginationItem, PaginationLink, Alert } from 'reactstrap';
import ListDriverItem from '../../components/ListDriverItem'

import './index.styl'

const ListDrivers = (props) => {
  const [ currentPage, setCurrentPage ] = useState(0)
  const { drivers, loading } = props

  const data = Object.keys(drivers)
  const pageSize = 5
  const pagesCount = Math.ceil(data.length / pageSize);

  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index)
  }

  if (loading) {
    return (
      <></>
    )
  }

  if (drivers.length === 0) {
    return (
      <Alert className="not-found" color="secondary">
        Não foi encontrado nenhum motorista.
      </Alert>
    )
  }

  return (
    <>
    <Table responsive borderless striped className="list-drivers">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        {data
          .slice(
            currentPage * pageSize,
            (currentPage + 1) * pageSize
          )
          .map((item) => 
            <ListDriverItem key={item} content={drivers[item]}/>
          )}
      </tbody>
    </Table>
    <Pagination className="list-navigation">
      <PaginationItem disabled={currentPage <= 0}>
        <PaginationLink
          onClick={e => handleClick(e, currentPage - 1)}
          previous
          href="#"
        />
      </PaginationItem>
      {[...Array(pagesCount)].map((page, i) => 
        <PaginationItem active={i === currentPage} key={i}>
          <PaginationLink onClick={e => handleClick(e, i)} href="#">
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      )}
      <PaginationItem disabled={currentPage >= pagesCount - 1}>
        <PaginationLink
          onClick={e => handleClick(e, currentPage + 1)}
          next
          href="#"
        />
      </PaginationItem>
    </Pagination>
    </>
  );
}

export default ListDrivers;