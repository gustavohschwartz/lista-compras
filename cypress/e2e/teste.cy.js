describe('Teste de lista de supermercado', () => {
    beforeEach(() => {
      cy.visit('index.html'); 
      localStorage.clear(); 
    });
  
    it('Deve carregar itens salvos no localStorage', () => {
      localStorage.setItem('itens', JSON.stringify([{ nome: 'Arroz', comprado: false }]));
      cy.reload();
      
      cy.get('#lista-itens li').should('have.length', 1);
      cy.get('#lista-itens li').contains('Arroz');
    });
  
    it('Deve adicionar um novo item à lista', () => {
      cy.get('#input-item').type('Feijão');
      cy.get('#formulario').submit();
      
      cy.get('#lista-itens li').should('have.length', 1);
      cy.get('#lista-itens li').contains('Feijão');
    });
  
    it('Deve riscar item quando marcado como comprado', () => {
      cy.get('#input-item').type('Feijão');
      cy.get('#formulario').submit();
      
      cy.get('#lista-itens li input[type="checkbox"]').check();
      cy.get('#lista-itens li span').should('have.class', 'riscado');
    });
  
    it('Deve remover um item da lista', () => {
      cy.get('#input-item').type('Feijão');
      cy.get('#formulario').submit();
      
      cy.get('#lista-itens li button').click();
      cy.get('#lista-itens li').should('have.length', 0);
    });
  
    it('Deve limpar toda a lista de itens', () => {
      cy.get('#input-item').type('Arroz');
      cy.get('#formulario').submit();
  
      cy.get('#limpar-lista').click();
      cy.get('#lista-itens').children().should('have.length', 0);
      cy.wrap(localStorage.getItem('itens')).should('be.null');
    });
  
    it('Deve resetar o status de todos os itens da lista', () => {
      cy.get('#input-item').type('Arroz');
      cy.get('#formulario').submit();
      cy.get('#lista-itens li input[type="checkbox"]').check();
      
      cy.get('#reset-lista').click();
      
      cy.get('#lista-itens li input[type="checkbox"]').should('not.be.checked');
      cy.get('#lista-itens li span').should('not.have.class', 'riscado');
    });
  
    it('Deve redirecionar para a página de histórico', () => {
      cy.get('#historico-lista').click();
      cy.url().should('include', 'historico.html');
    });
  });
  