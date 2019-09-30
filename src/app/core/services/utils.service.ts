import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
  constructor() { }

  filterPosts(searchedText, columns, posts) {
    return posts.filter(post => {
      if (!searchedText) {
        return true;
      }

      for (const column of columns) {
        if (post[column] && post[column].toString().toLowerCase().indexOf(searchedText) > -1) {
          return true;
        }
      }

      return false;
    });
  }
}
