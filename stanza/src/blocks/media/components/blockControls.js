
import { __ } from '@wordpress/i18n';
import { MediaReplaceFlow, BlockControls,  __experimentalLinkControl } from '@wordpress/block-editor';
import { ToolbarGroup, Icon, ToolbarButton, MenuItem, Popover } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { caption as captionIcon } from '@wordpress/icons';
import { displayShortcut } from '@wordpress/keycodes';
import { link } from '@wordpress/icons';

import { onSelect, onSelectURL, onRemove } from '../helpers';

export default function MediaBlockControls({ attributes, setAttributes, isSelected }) {
	const { mediaHasCaption, mediaHref, mediaLinkTarget, mediaAspectRatio, mediaId, mediaImageSize, mediaInlineSvg, mediaUrl } = attributes;
	const allowedTypes = ['image', 'video'];
	const [isEditingLink, setIsEditingLink] = useState(false); // State for controlling the link editing

	const startEditing = () => {
        setIsEditingLink(true);
    };

    const stopEditing = () => {
        setIsEditingLink(false);
    };
	    
	return (
		<>
			{ ! mediaInlineSvg ? (				
			<ToolbarGroup>
				<ToolbarButton
		        	icon={ <Icon icon={ captionIcon } /> }
		          	isPressed={ !!mediaHasCaption }
		          	onClick={ () => setAttributes( { mediaHasCaption: ! mediaHasCaption } ) }
		        />			
			</ToolbarGroup>
			) : ( <></> )}

			<ToolbarGroup>
				<MediaReplaceFlow
					mediaId={ mediaId }
					mediaURL={ mediaUrl }
					allowedTypes={ allowedTypes }
					accept={ ['image', 'video'].includes('image') ? 'image/*' : undefined }
					onSelect={ (media) => ( onSelect(media, setAttributes, mediaImageSize, mediaAspectRatio) ) }
					onSelectURL={ (media) => ( onSelectURL(media, setAttributes) ) }
					name={ mediaId ?  __( 'Replace', 'stanza' ) : __( 'Add media', 'stanza' ) }
					variant="toolbar"
				>
				{ ({ onClose }) =>
					mediaId && mediaUrl ? (
						<MenuItem onClick={ (media) => { onRemove(setAttributes); onClose(); } }>
							{ __( 'Remove', 'stanza' ) }
						</MenuItem>
					) : null
				}
				</MediaReplaceFlow>
			</ToolbarGroup>

			<BlockControls>
                <ToolbarButton
                    name="link"
                    icon={link}
                    title={__('Edit Link', 'stanza')}
                    shortcut={displayShortcut.primary('k')}
                    onClick={startEditing}
                    style={
                        {backgroundColor: ! mediaHref ? 'yellow' : 'transparent' }
                    }
                />
            </BlockControls>

			{ isSelected && isEditingLink && (
			<Popover position="bottom-center" onClose={ stopEditing }>
                <__experimentalLinkControl
                    value={{ url: mediaHref, opensInNewTab: mediaLinkTarget }}
                    onChange={({ url, opensInNewTab }) => {                    	
						setAttributes({ mediaHref: url || '', mediaLinkTarget: !! opensInNewTab });
					} }
                    onRemove={() => {
                        setAttributes({ mediaHref: '', mediaLinkTarget: '' });
                        stopEditing();
                    }}
                />
            </Popover>
            ) }
		</>
	);
}