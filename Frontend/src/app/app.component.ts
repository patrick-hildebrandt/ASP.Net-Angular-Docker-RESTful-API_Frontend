import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface Article {
  artikelnummer: string;
  marke: string;
  material1: string;
  legierung1: string;
  kollektion: string;
  warengruppe: string;
  warenhauptgruppe: string;
  geschlecht: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'Frontend';
  articles: Article[] = [];
  test: any;
  
  constructor(private http: HttpClient) {
  }
  
  fetchArticles() {
    // this.http.get<Article[]>('http://localhost:32781/api/articles').subscribe(
    this.http.get<any>('https://jsonplaceholder.typicode.com/todos/1').subscribe(
      (resp: any) => {
        console.log(resp);
        // this.articles = resp;
        this.test = resp;
      }
    );
  }

  ngOnInit(): void {
    this.fetchArticles();
  }
}
