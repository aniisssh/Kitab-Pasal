import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyOrdersComponent } from './view-my-orders.component';

describe('ViewMyOrdersComponent', () => {
  let component: ViewMyOrdersComponent;
  let fixture: ComponentFixture<ViewMyOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMyOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
