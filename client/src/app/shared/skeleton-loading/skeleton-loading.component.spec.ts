import { SkeletonLoadingComponent } from './skeleton-loading.component';

describe('SkeletonLoadingComponent', () => {
  let component: SkeletonLoadingComponent;

  beforeEach(async () => {
    component = new SkeletonLoadingComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
