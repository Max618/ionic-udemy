import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { FilmesDetalhesPage } from '../filmes-detalhes/filmes-detalhes';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MoovieProvider
  ]
})
export class FeedPage {
  public lista_filmes = new Array<any>();
  public loader;
  public refresher;
  public isRefreshing: boolean = false;

  public name_user:string = "Nome da var";
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private movieProvider: MoovieProvider,
      public loadingCtrl: LoadingController,
    ) {
  }

  ionViewDidEnter() {
  	this.loadMovies();
  }

  loadMovies(){
    this.openLoad();
    this.movieProvider.getLatestMovies().subscribe(
      data=>{
        const response = (data as any);
        const obj_retorno = JSON.parse(response._body);
        this.lista_filmes = obj_retorno.results;
        console.log(obj_retorno);
      },
      error=> {
        console.log(error);
      }
    )
    this.closeLoad();
    if(this.isRefreshing){
      this.refresher.complete();
      this.isRefreshing = false;
    }
  }

  openLoad() {
    this.loader = this.loadingCtrl.create({
      content: 'Carregando...'
    });
  
    this.loader.present();
  
  }

  closeLoad(){
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.loadMovies();
  }

  abrirDetalhes(filme){
    this.navCtrl.push(FilmesDetalhesPage, {id: filme.id});
  }

}
