class MessageSystem{

	Notification(settings) {

		this.type = settings.type || "success";
		this.message = settings.message || "";

		let icon;
		let color;
		
		if(this.type=='success'){
			icon = 'far fa-check-circle';
			color = '#71b200';
		} else if (this.type =='error'){
			icon = 'fas fa-exclamation-triangle';
			color = '#c34d4d';
		}

		if($('#ms-notification-area').length === 0){

			const area = $(`<div id="ms-notification-area"></div>`);
			$(document.body).append(area);

		};

		const notification = $(`<div class="ms-notification">
			<div class="ms-notification-body">
				<span class="close-ms-notification"><i class="fas fa-times fa-fw" aria-hidden="true"></i></span>
				<div class="ms-notification-icon">
					<span><i class=" ${icon} fa-fw" aria-hidden="true" style="color:${color}"></i></span>
				</div>
				<div class="ms-notification-text">
					<p class="ms-notification-message">${this.message}</p>
				</div>
			</div>
		</div>`).hide();

		if($(window).width() < '600'){

			$('.ms-notification').remove();
			$('#ms-notification-area').append(notification);
			notification.fadeIn(200);

		}else{

			$('#ms-notification-area').append(notification);
			notification.fadeIn(200);

		}
		
		setTimeout(() => {

			notification.fadeOut(200, function(){

				$(this).remove();

				if(!$('#ms-notification-area').html()){

					$('#ms-notification-area').remove();

				}

			});

		}, 10000);

	};

};

$(document).on('click', '.close-ms-notification', function(){

	$(this).parents('.ms-notification').fadeOut(200, function(){
		$(this).remove();
	});

});

$(document).on('click', '.ms-label-close', function(){

	$(this).parents('.ms-label').remove();

});

const ms = new MessageSystem();