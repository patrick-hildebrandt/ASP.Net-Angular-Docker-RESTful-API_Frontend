import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// wichtig für *ngFor
import { CommonModule } from '@angular/common';

interface Article {
  articleId: string;
  artikelnummer: string;
  marke: string;
  material1: string;
  legierung1: string;
  kollektion: string;
  warengruppe: string;
  warenhauptgruppe: string;
  geschlecht: string;
  attributes: [];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  fileName = 'articles.csv';
  articles: Article[] = [];
  test: any;

  constructor(private http: HttpClient) {
  }

  fetchArticles() {
    this.http.get<Article[]>('http://localhost:32789/api/articles').subscribe(
      // this.http.get<any>('https://jsonplaceholder.typicode.com/todos/1').subscribe(
      (resp: any) => {
        console.log(resp);
        this.articles = resp;
        // this.test = resp;
      }
    );
  }

  downloadCsv() {
    // Manuell definierte Header
    const headers = ['Artikelnummer', 'Marke', 'Material1', 'Legierung1', 'Kollektion', 'Warengruppe', 'Warenhauptgruppe', 'Geschlecht'];
    // Erstelle die Header-Zeile für den CSV
    const headerRow = headers.join(';');
    // Erstelle die CSV-Zeichenfolge mit Header und Daten
    const csv = `${headerRow}\n${this.articles.map(article => {
      // Überprüfen, ob das article-Objekt das Attribut articleId hat
      if (article.hasOwnProperty('articleId')) {
        // Wenn articleId vorhanden ist, entferne es und erstelle den CSV-Eintrag
        const { articleId, ...articleWithoutId } = article;
        return Object.values(articleWithoutId).join(';');
      } else {
        // Wenn articleId nicht vorhanden ist, erstelle den CSV-Eintrag ohne Änderungen
        return Object.values(article).join(';');
      }
    }).join('\n')}`;
    // Erstelle und öffne den CSV-Blob mit angegebenem Dateinamen
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    // Bestimme den Dateinamen und öffne den Link zum Download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', this.fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  ngOnInit(): void {
    this.fetchArticles();
  }
}
