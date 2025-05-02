import { CommonModule } from '@angular/common';
import { Component, effect, Input, OnInit } from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { UserState } from '../../../core/states/user.state';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-profile-picture',
    standalone: true,
    imports: [CommonModule, ImageCropperComponent],
    templateUrl: './profile-picture.component.html',
    styleUrl: './profile-picture.component.css'
})
export class ProfilePictureComponent {

    imageUrl = 'default-profile.png';

    imageChangedEvent: any = '';
    croppedImage: string = '';
    showCropper = false;
    isImageCropped = false;
    croppedBlob: Blob | null = null;

    constructor(private userState: UserState) {
        effect(() => {
            this.imageUrl = `${environment.apiUrl}/images/${this.userState.user().profilePicture}`;
        })
    }

    onFileChange(event: any): void {
        if (event.target.files && event.target.files.length > 0) {
            this.imageChangedEvent = event;
            this.showCropper = true;
            this.isImageCropped = false;
        } else {
            console.warn('Invalid file input:', event);
        }
    }

    onImageCropped(event: ImageCroppedEvent): void {
        if (!event.blob) {
            console.warn('No blob from cropper:', event);
            return;
        }

        this.croppedImage = URL.createObjectURL(event.blob);
        this.croppedBlob = event.blob;
        this.isImageCropped = true;
    }


    cancelCrop(): void {
        this.showCropper = false;
        this.imageChangedEvent = '';
        this.croppedImage = '';
        this.isImageCropped = false;
    }

    uploadCroppedImage(): void {
        if (!this.croppedBlob) {
            alert('Please crop the image before uploading.');
            return;
        }

        const formData = new FormData();
        formData.append('image', this.croppedBlob, 'profile.png');

        this.userState.changeProfilePicture(formData);
        this.imageUrl = this.croppedImage;
        this.cancelCrop();
    }

    deleteProfilePicture(): void {
        this.userState.deleteProfilePicture();
    }
}
