import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AidFormComponent } from './aid-form.component';

describe('AidFormComponent', () => {
  let component: AidFormComponent;
  let fixture: ComponentFixture<AidFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AidFormComponent ],
      imports: [ HttpClientTestingModule, ReactiveFormsModule ]
    }).compileComponents();

    fixture = TestBed.createComponent(AidFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
