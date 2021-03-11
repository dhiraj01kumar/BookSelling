import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductslistComponent } from './products.component';


describe('ProductsComponent', () => {
  let component: ProductslistComponent;
  let fixture: ComponentFixture<ProductslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
