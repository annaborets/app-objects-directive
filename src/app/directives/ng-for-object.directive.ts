import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface objectItem {
  [key: string]: objectItem | string | number;
}

interface objectOutputItem {
  data: string;
  level: number;
}

interface ForDirectiveContext<T> {
  $implicit: objectOutputItem;
}

@Directive({
  selector: '[objectFor]'
})
export class ForDirective {
  private objectItem: objectItem = {};
  private items: objectOutputItem[] = [];

  static ngTemplateContextGuard<objectOutputItem>(
    dir: ForDirective,
    ctx: unknown
  ): ctx is ForDirectiveContext<objectOutputItem> {
    return true;
  }

  constructor(
    private templateRef: TemplateRef<unknown>,
    private vcr: ViewContainerRef
  ) {}

  @Input() set objectForOf(objectItem: objectItem) {
    this.objectItem = objectItem;
    this.onItemsChange();
  }

  private onItemsChange(): void {
    this.vcr.clear();

    this.items = [];

    this.iterateObject(this.objectItem);
    this.renderItems();
  }

  private renderItems() {
    this.items.forEach((item) => {
      this.vcr.createEmbeddedView(this.templateRef, {
        $implicit: item
      });
    });
  }

  private iterateObject(obj: objectItem, level = 0) {
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
  }
}
