import { Observable, timer } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';

import { UtilsService } from 'src/app/core/services/utils.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Post } from 'src/app/core/interfaces/post.interface';
import { IAppState } from 'src/app/core/store/state/app.state';
import { GetPostsStart, ViewPostStart } from 'src/app/core/store/actions/posts.action';
import { Algolia } from 'src/app/core/interfaces/algolia.interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})

export class PostsComponent implements OnInit {
  interval: Observable<number> = timer(0, 1000 * 10);
  posts: Post[] = [];
  searchText = '';
  columns = ['title', 'author', 'url', 'created_at'];
  algoliaResponse: Algolia;

  constructor(
    private _modalService: NgbModal,
    private _utilsService: UtilsService,
    private _store: Store<IAppState>
  ) { }

  ngOnInit() {
    // Init interval
    this.interval.subscribe(data => {
      this._store.dispatch(new GetPostsStart());
    });
    this._store.select('postsData').subscribe(data => {
      if (data.algoliaResponse) {
        this.algoliaResponse = data.algoliaResponse;
        this.posts = data.algoliaResponse.hits || [];
      }
    });
  }

  // Search datatable
  onSearch(event) {
    if (event && event.target && event.target.value) {
      const searchedText = event.target.value.toLowerCase();
      this.posts = this._utilsService.filterPosts(searchedText, this.columns, [...this.posts]);
    } else {
      this.posts = this.algoliaResponse.hits || [];
    }
  }

  // Open modal and get selected row data
  openPostModal(event) {
    if (event.type == 'click') {
      const modalRef = this._modalService.open(ModalComponent, {
        size: 'lg',
        centered: true
      });
      event.event.target.closest('datatable-body-cell').blur();
      this._store.dispatch(new ViewPostStart({ data: event.row }));
    }
  }
}
