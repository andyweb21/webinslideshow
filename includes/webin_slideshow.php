<?php
class Webin_slideshow {
    function __construct() {
        add_action( 'after_setup_theme', array($this, 'webin_setup'));
        add_action( 'add_meta_boxes', array($this, 'webin_meta_box'));
        add_action( 'save_post', array($this, 'webin_save'));
        add_action( 'wp_enqueue_scripts', array($this, 'webin_scripts'));
        add_shortcode( 'webin-slideshow', array($this, 'webin_shortcode'));
    }

    function webin_setup() {
        // Post Type Slideshow
        $slideshow_args = [
            'labels'     => [
                'name'  => 'Webin Slides',
                'singular_name' => 'Webin Slide',
            ],
            'hierarchical'  => false,
            'public'    => true,
            'has_archive'   => false,
            'show_in_nav_menus'  => false,
            'menu_icon' => 'dashicons-format-gallery',
            'supports'       => ['title', 'editor', 'thumbnail'],
        ];
        register_post_type( 'webin_slideshow', $slideshow_args );

        // Slideshow Group
        $slideshow_group_args = [
            'labels'     => [
                'name'  => 'Group',
                'singular_name' => 'Group',
            ],
            'hierarchical'  => false,
            'show_in_nav_menus'  => false,
            'show_admin_column'  => true,
            'public'    => true,
        ];
        register_taxonomy( 'webin_slideshow_group', ['webin_slideshow'], $slideshow_group_args );

    }

    function webin_meta_box()
    {
        add_meta_box( 'webin-cta', // ID attribute of metabox
                    'Call to Action',       // Title of metabox visible to user
                    array($this, 'webin_callback'), // Function that prints box in wp-admin
                    'webin_slideshow',  // Show box for posts, pages, custom, etc.
                    'side',            // Where on the page to show the box
                    'low' );
    }

    function webin_callback( $post ) {
        wp_nonce_field( basename(__FILE__), 'mam_nonce' );

        // How to use 'get_post_meta()' for multiple checkboxes as array?
        $slideshow_url = get_post_meta( $post->ID, 'webin_slide_url', true );
        ?>
        <p>
            <input  type="text" name="webin_slide_url" id="webin-slide-<?php echo $id;?>" placeholder="URL" value="<?php echo $slideshow_url;?>" />
        </p>
        <?php
    }

    function webin_save( $post_id ) {
        $is_autosave = wp_is_post_autosave( $post_id );
        $is_revision = wp_is_post_revision( $post_id );
        $is_valid_nonce = ( isset( $_POST[ 'mam_nonce' ] ) && wp_verify_nonce( $_POST[ 'mam_nonce' ], basename( __FILE__ ) ) ) ? 'true' : 'false';
    
        if ($is_autosave || $is_revision || !$is_valid_nonce) {
            return;
        }
    
        // If the checkbox was not empty, save it as array in post meta
        if ( ! empty( $_POST['webin_slide_url'] ) ) {
            update_post_meta( $post_id, 'webin_slide_url', $_POST['webin_slide_url'] );
    
        // Otherwise just delete it if its blank value.
        } else {
            delete_post_meta( $post_id, 'webin_slide_url' );
        }
    }

    // ================== FRONT-END RESPONSE ==================

    function webin_scripts() {
        // Slick Style
        wp_register_style(
            'slick-style', 
            plugins_url('assets/slick/slick.css', __DIR__),
        );
        wp_enqueue_style('slick-style');

        // Webin Slideshow Style
        wp_register_style( 
            'webin-slideshow',
            plugins_url('assets/css/style.css', __DIR__),
            [],
            '1.0.0', 
            'all'
        );
        wp_enqueue_style('webin-slideshow');

        // Slick Slideshow Script
        wp_register_script(
            'webin-slick-script', 
            plugins_url('assets/slick/slick.min.js', __DIR__),
            ['jquery']
        );
        wp_enqueue_script('webin-slick-script');

        // Webin Slideshow Script
        wp_register_script(
            'webin-slide-script', 
            plugins_url('assets/js/main.js', __DIR__),
            ['jquery'],
            '1.0.0.3');
        wp_enqueue_script('webin-slide-script');
    }

    function webin_shortcode($atts) {
        $data = shortcode_atts( [
            'class'    => '',
            'group'    => '',
            'slick-arrow'    => '',
            'limit'    => 5,
            'sort'    => 'DESC',
        ], $atts, 'webin_shortcode' );
    
        $args = array(  
            'post_type' => 'webin_slideshow',
            'post_status' => 'publish',
            'posts_per_page' => $data['limit'],
            'orderby' => 'date', 
            'order' => $data['sort'],
            'tax_query' => array(
                array(
                    'taxonomy' => 'webin_slideshow_group',
                    'field'    => 'slug',
                    'terms'    => $data['group']
                ),
            )
        );
    
        $loop = new WP_Query( $args );

        $template = file_get_contents(plugin_dir_path( __DIR__ ).'template/default.php');

        if($loop->have_posts()) :

        if(in_array($data['group'], array('karakter','kelompok-bermain'))) {
            $html = '<div class="webin-slide '.$data['class'].'" data-slick=\'{"arrows": false, "dots": false, "autoplay": false, "asNavFor": ".webin-thumbnail"}\'>';

            while ( $loop->have_posts() ) : $loop->the_post();

                $image = get_the_post_thumbnail( get_the_ID() );
                $image_url = get_the_post_thumbnail_url( get_the_ID() );

                $html .= '<div class="webin-slide__item" style="--image-url: url('.$image_url.')">';
                $html .= '<div class="webin-slide__item-image">'.$image.'</div>';
                $html .= '</div>';

            endwhile;

            $html .= '</div>';

            $html .= '<div class="webin-thumbnail karakter-thumbnail" data-slick=\'{"arrows": false, "dots": true, "autoplay": false, "asNavFor": ".webin-slide"}\'>';

            while ( $loop->have_posts() ) : $loop->the_post(); 

                $title =  get_the_title();
                $content = wpautop( get_the_content() );
                $url = get_post_meta( get_the_ID(), 'webin_slide_url', true );

                $html .= '<div class="webin-slide__item">';
                $html .= '<div class="webin-slide__item-content">';

                if(get_field('webin_slideshow_icon')) {
                $html .= '<div class="webin-slide__item-icon"><img src="'.get_field('webin_slideshow_icon').'" class="img-full" /></div>';
                }
                $html .= '<div><div class="webin-slide__item-title">'.$title.'</div>';
                $html .= '<div class="webin-slide__item-text">'.$content.'</div></div>';
                
                $html .= '</div>';
                $html .= '</div>';

            endwhile;

            $html .= '</div>';
        } else if($data['group'] == 'kerjasama-pendidikan') {
            $html = '<div class="'.$data['class'].'">';

            while ( $loop->have_posts() ) : $loop->the_post();

                $image = get_the_post_thumbnail( get_the_ID() );
                $image_url = get_the_post_thumbnail_url( get_the_ID() );
                $title =  get_the_title();
                // $content = get_the_content();
                $content = wpautop( get_the_content() );
                $url = get_post_meta( get_the_ID(), 'webin_slide_url', true );

                $html .= '<div class="webin-slide__item" style="--image-url: url('.$image_url.')">
                    <div class="webin-slide__item-title">'.$title.'</div>
                    <div class="webin-slide__item-image">'.$image.'</div>
                    <div class="webin-slide__item-text">'.$content.'</div>';
                $html .= '</div>';

            endwhile;

            $html .= '</div>';
        } else {
            $html = '<div class="webin-slide '.$data['class'].'">';

            while ( $loop->have_posts() ) : $loop->the_post(); 

                $image = get_the_post_thumbnail( get_the_ID() );
                $image_url = get_the_post_thumbnail_url( get_the_ID() );
                $title =  get_the_title();
                // $content = get_the_content();
                $content = wpautop( get_the_content() );
                $url = get_post_meta( get_the_ID(), 'webin_slide_url', true );

                $html .= '<div class="webin-slide__item" style="--image-url: url('.$image_url.')">
                    <div class="webin-slide__item-image">'.$image.'</div>
                    <div class="webin-slide__item-content"><div class="webin-slide__item-title">'.$content.'</div>';
                
                if($url != '') {
                    $html .= '<div class="webin-slide__item-link"><a href="'.$url.'">Daftar Sekarang</a></div>';
                }
                $html .= '</div>';
                $html .= '</div>';

            endwhile;

            $html .= '</div>';
        }
        
        endif;

        wp_reset_postdata();

        return $html;
    }
}