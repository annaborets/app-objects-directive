import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import {
  ForDirectiveContext,
  objectOutputItem,
  objectItem
} from '../models/oblect-model';

@Directive({
  selector: '[objectFor]'
})
export class ForDirective {
  private dictionary: objectItem = {};
  private items: objectOutputItem[] = [];

  static ngTemplateContextGuard<Dic>(
    dir: ForDirective,
    ctx: unknown
  ): ctx is ForDirectiveContext<Dic> {
    return true;
  }

  constructor(
    private templateRef: TemplateRef<unknown>,
    private vcr: ViewContainerRef
  ) {}

  @Input() set objectForOf(dictionary: objectItem) {
    this.dictionary = dictionary;
    this.renderItems();
  }

  private renderItems(): void {
    this.vcr.clear();

    this.items = [];

    this.iterateObject(this.dictionary);

    this.items.map((item) => {
      this.vcr.createEmbeddedView(this.templateRef, {
        $implicit: item
      });
    });
  }

  private iterateObject = (obj: objectItem, level = 0) => {
    this.items.push({
      data: JSON.stringify(obj),
      level
    });

    Object.keys(obj).forEach((key) => {
      const value = obj[key];

      if (
        typeof value !== 'string' &&
        typeof value !== 'number' &&
        obj[key] !== null
      ) {
        this.iterateObject(value, level + 1);
      }
    });
  };
}
