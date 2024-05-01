import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  fetchedItems: any[] = []; // Armazena os itens originais
  displayedItems: any[] = []; // Armazena os itens exibidos após filtragem
  searchTerm: string = ''; // Replace 'any' with your actual data type
  timestamps: number[] = []; // Array to store all timestamps
  infoData: any; // Variable to store the retrieved data
  
  newCellphone = {
    celular: '',
    tela: '',
    valor: 0
  };

  celular: string | undefined;
  tela: string | undefined;
  valor: number | undefined;

  showModal: boolean = false; // Variável de controle para exibir/ocultar o modal
  selectedItem: any = null; // Item selecionado para edição
  editingMode: boolean = false; // Indica se estamos em modo de edição
  
  clearForm() {
    this.searchTerm = ''; // Limpar o termo de pesquisa
    this.newCellphone = {
      celular: '',
      tela: '',
      valor: 0
    };
    this.selectedItem = null;
  }
  

  constructor(private apiService: ApiService) {}


  
  async ngOnInit() {
    await this.getinfo(); // Aguarda a conclusão da obtenção das informações
    this.displayedItems = [...this.fetchedItems]; // Inicialmente exibe todos os itens
    // console.log('oi',this.displayedItems)
  }
  
  async getinfo() {
    try {
      const response = await this.apiService.getInfo();
      if (!response || typeof response !== 'object') {
        console.error('Response is not a valid object or is null.');
        return;
      }
      this.fetchedItems = Object.values(response);
      // console.log("Itens recuperados:", this.fetchedItems); // Convert object to array
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  onSearch() {
    // Implemente a lógica de pesquisa aqui
    const searchText = this.searchTerm.toLowerCase().trim(); // Remover espaços em branco e converter para minúsculas
    console.log("searchText:", searchText); // Depurar o texto de pesquisa
    this.displayedItems = this.fetchedItems.filter(item =>
      item.celular.toLowerCase().includes(searchText) ||
      item.tela.toLowerCase().includes(searchText) ||
      item.valor.toString().includes(searchText)
    );
    console.log("Itens exibidos após pesquisa:", this.displayedItems); // Depurar itens exibidos
  }

  async onSave(form: NgForm) {
    
    // Aqui você pode implementar a lógica para salvar os dados do formulário
    
    if (form.valid) {
      this.newCellphone.celular = this.celular!;
      this.newCellphone.tela = this.tela!;
      this.newCellphone.valor = this.valor!;

      console.log(this.newCellphone)
      await this.apiService.saveInfo(this.newCellphone);
      
      
    this.toggleModal();
      window.location.reload();
    // Após salvar, você pode fechar o modal, emitir um evento, etc.
  }
} 

async onAlter(form: NgForm){
  
  if (form.valid) {
    const updatedCellphone = {
      celular: form.value.celular,
      tela: form.value.tela,
      valor: form.value.valor
    };

  console.log(this.selectedItem.id)  
  console.log(updatedCellphone)
  // console.log(newinfo)

  this.selectedItem
  await this.apiService.updateInfo(this.selectedItem.id, updatedCellphone);
    window.location.reload();
}
}

adicionarItem(){
  this.editingMode = false
  this.toggleModal();
}

alterarItem(item: any) {
  this.selectedItem = item;
  this.editingMode = true;
  this.toggleModal();
}


toggleModal() {
  console.log(this.newCellphone)
  console.log(this.selectedItem)
  
  this.showModal = !this.showModal; // Alternar a variável showModal entre true e false
}
  
  excluirItem(item: any) {
    // Aqui você pode chamar a função da API para excluir o item
    // Por exemplo:
    this.apiService.deleteInfo(item.id)
      window.location.reload()
  }

}