import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { ViewPostStop } from 'src/app/core/store/actions/posts.action';
import { IAppState } from 'src/app/core/store/state/app.state';
import { Post } from 'src/app/core/interfaces/post.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

  selectedPost: Post;
  postSubscription: Subscription;

  constructor(
    public activeModal: NgbActiveModal,
    public _store: Store<IAppState>
  ) { }

  ngOnInit() {
    this.postSubscription = this._store.select('postsData').subscribe(data => {
      if (data.selectedPost) {
        this.selectedPost = data.selectedPost;
      }
    });
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
    this._store.dispatch(new ViewPostStop());
  }
}
